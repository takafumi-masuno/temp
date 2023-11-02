import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as compression from 'compression';
import * as Log4js from 'log4js';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { AppPort } from '../config/port';
import { fillHeader } from '../express';
import { Type } from '@angular/core';
import mime from 'mime-types';
import { LoggerLogic } from '../../libs/utils/log/logger/src';
import { withTrailingSlash } from '../../libs/utils/router/src';

// The Express app is exported so that it can be used by serverless Functions.
export function app(
  appPath: string,
  baseHref: string,
  bootstrap: Type<{}>,
  environment,
  port: number
): express.Express {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const server = express();
  // コンテンツを圧縮する
  server.use(
    compression({
      threshold: 0,
      level: 4,
      memlevel: 1,
    }) as any
  );

  server.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const url = req.url.replace(/\/+/g, '/');
      if (url !== req.url) {
        res.redirect(301, url);
      } else {
        next();
      }
    }
  );

  server.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (
        environment.healthCheck && typeof environment.healthCheck === 'string'
          ? req.url.endsWith(environment.healthCheck)
          : environment.healthCheck(req.url)
      ) {
        res.json({ status: 'ok' });
      } else {
        next();
      }
    }
  );

  const distFolder = join(process.cwd(), `dist/${appPath}/browser`);
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Cookieヘッダーを設定。
  server.use(fillHeader());

  // JSONオブジェクトの受信設定
  server.use(express.json());
  // Cookieの受信設定
  server.use(
    cookieParser([], {
      decode: (val) =>
        val.replace(/\\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\\//g, '/'),
    })
  );
  // 配列側のオブジェクトの受信設定
  server.use(express.urlencoded({ extended: true }));

  // アクセスログ
  server.use(
    Log4js.connectLogger(
      new LoggerLogic(
        'accesslog',
        environment.logConfig.logRootPath,
        environment.logConfig.type,
        environment.logConfig.pm2Enabled,
        environment.logConfig.pm2InstanceVar
      ).getLogger(),
      {
        level: 'auto',
        format: (req, res, format) =>
          format(
            `:remote-addr - ${
              req.id ? req.id : ''
            } - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" param: ${JSON.stringify(
              req.params
            )} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(
              req.body
            )} cookie: ${JSON.stringify(req.cookies)}`
          ),
        nolog: '\\.gif|\\.jpg|\\.webp|\\.svg|\\.png|\\.ico|\\.js|\\.css$',
      }
    )
  );

  // リクエストログ
  const logger = new LoggerLogic(
    'default',
    environment.logConfig.logRootPath,
    environment.logConfig.type,
    environment.logConfig.pm2Enabled,
    environment.logConfig.pm2InstanceVar
  );
  server.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // リクエストが正しくないものは除外
      if (!req || !req.method || !req.header) {
        next();
        return;
      }
      // 静的ファイルはリクエストログから除外
      if (
        req.originalUrl.match(
          /.?\.ico$|.?\.png$|.?\.svg$|.?\.jpg$|.?\.webp$|.?\.gif$|.?\.js$|.?\.css$/gi
        )
      ) {
        next();
        return;
      }
      // ログコンテキストにリクエスト情報を追加
      logger.setRequsetInfo(req);
      if (req.method === 'GET' || req.method === 'DELETE') {
        logger.info(
          `${req.protocol}://${req.hostname}${
            port == 80 || port == 443 ? '' : ':' + port
          }${req.originalUrl} query:${JSON.stringify(
            req.query
          )}, params: ${JSON.stringify(req.params)}`
        );
      } else {
        logger.info(
          `${req.protocol}://${req.hostname}${
            port == 80 || port == 443 ? '' : ':' + port
          }${req.originalUrl} body:${JSON.stringify(
            req.body
          )}, query:${JSON.stringify(req.query)}, params: ${JSON.stringify(
            req.params
          )}`
        );
      }
      next();
    }
  );

  async function printPDF(url: string) {
    const chromium = await import('chrome-aws-lambda-esbuild');
    const puppeteer = (chromium['default'] || chromium).puppeteer;
    const browser = await puppeteer.launch({
      args: chromium['args'],
      executablePath: environment.localChromium,
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const [width, height] = await page.evaluate(() => [
      document.documentElement.offsetWidth,
      document.documentElement.offsetHeight,
    ]);
    const a4Height = 1123;
    const scale = a4Height / Math.max(a4Height, +height);
    const pdf = await page.pdf({
      pageRanges: '1',
      format: 'A4',
      scale,
      printBackground: true,
    });
    await browser.close();
    return pdf;
  }

  server.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // リクエストが正しくないものは除外
      if (!req || !req.method || !req.header) {
        next();
        return;
      }
      // 静的ファイルはリクエストログから除外
      if (req.originalUrl.match(/.?bukken\.pdf$/gi)) {
        try {
          printPDF(
            req.protocol +
              '://' +
              (req.get('host')?.includes('localhost')
                ? req.get('host')
                : 'localhost:' + process.env.PORT) +
              req.originalUrl.replace('bukken.pdf', 'print/')
          ).then((pdf) => {
            res.set({
              'Content-Type': 'application/pdf',
              'Content-Length': pdf.length,
              'Content-disposition': 'inline;filename=bukken.pdf',
            });
            res.send(pdf);
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        next();
      }
    }
  );

  server.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (!req || !req.method || !req.header) {
        next();
        return;
      }
      const url = withTrailingSlash(req.url);
      if (url !== req.url) {
        res.redirect(301, url);
      } else {
        next();
      }
    }
  );

  // サブディレクトリ(/rent_office/)を配置
  server.use(`/${baseHref}/`, (req, res, next) => {
    if (req.path == '/') return next();
    return express.static(distFolder, {
      maxAge: '1y',
      setHeaders: function (res, path) {
        if (mime.lookup(path) === 'text/html') {
          res.setHeader('Cache-Control', 'public, max-age=0');
        }
      },
    })(req, res, next);
  });

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      inlineCriticalCss: false,
      bootstrap,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    if (req.method !== 'GET') return;
    res.vary('User-Agent').render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: REQUEST, useValue: req },
        { provide: RESPONSE, useValue: res },
        { provide: 'LoggerLogic', useValue: logger },
      ],
    });
  });

  // Example Express Rest API endpoints
  // server.post('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.post(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.post('*', (req, res) => {
    if (req.method !== 'POST') return;
    res.vary('User-Agent').render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: REQUEST, useValue: req },
        { provide: RESPONSE, useValue: res },
        { provide: 'LoggerLogic', useValue: logger },
      ],
    });
  });
  return server;
}

export function run(
  appPath: string,
  baseHref: string,
  module: Type<{}>,
  environment
): void {
  const port = process.env.PORT || AppPort.ssrPort[appPath];

  // Start up the Node server
  const server = app(
    appPath,
    baseHref,
    module,
    { healthCheck: (url) => url.endsWith('/healthcheck'), ...environment },
    +port
  );
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
