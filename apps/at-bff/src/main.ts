/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as compression from 'compression';
import { AppModule } from './app/app.module';
import { AtLoggerService } from '@shared/log';
import { environment } from './environments/environment';

async function bootstrap() {
  //TODO: CORSの設定を詳細に決める必要あり。
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.use(
    compression({
      threshold: 0,
      level: 4,
      memlevel: 1,
    })
  );
  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const healthCheck =
        environment.healthCheck || ((url) => url.endsWith('/healthcheck'));
      if (
        healthCheck && typeof healthCheck === 'string'
          ? req.url.endsWith(healthCheck)
          : (healthCheck as (url: string) => boolean)(req.url)
      ) {
        res.json({ status: 'ok' });
      } else {
        next();
      }
    }
  );
  // Cookie取得
  app.use(cookieParser());
  // 起動ログ
  app.useLogger(app.get(AtLoggerService));
  const globalPrefix = process.env.PREFIX || 'csite-bff';
  app.setGlobalPrefix(globalPrefix);
  // TODO: 本番環境時にdisableErrorMessagesを使用して詳細エラーを返却しないようにするかは検討する
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: true
  //   })
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  const port = process.env.PORT || 3333;

  // OpenAPI設定
  if (!environment.production) {
    const options = new DocumentBuilder()
      .setTitle('Cサイト事業用BFF')
      .setDescription('Cサイト事業用のBFFドキュメント')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }
  await app.listen(port, () => {
    app
      .get(AtLoggerService)
      .log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
