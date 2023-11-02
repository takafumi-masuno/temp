# C サイトプロジェクト コマンド

## nrwl/nx

## アプリの実行

```bash
# 例
nx serve at-rent-office
nx serve at-business-bff

```

## ビルド

```bash
# NestJS 例
nx run at-business-bff:build:production
※これはconfigurationが反映されなかった
npm run nx build at-business-bff -- --configuration=production
```

## ライブラリ作成

```bash
#  NestJS 例
npx nx generate @nx/nest:library features/bff/core
#  Node 例
npx nx generate @nx/node:library utils/microservices
```

## 機能ファイル作成

```bash
#  NestJS 例
npx nx g @nx/nest:module --name=line --project=at-business-bff --directory=app
npx nx g @nx/nest:controller --name=line --project=at-business-bff --directory=app
npx nx g @nx/nest:service --name=line --project=at-business-bff --directory=app
npx nx g @nx/nest:filter --name=http-exception --project=features-bff-core --directory=lib/filters
npx nx g @nx/nest:service --name=ms-breadcrumb --project=features-bff-microservices --directory=lib
```

## 削除

```bash
#  NestJS 例
npx nx g @nx/nest:remove at-business-bff-sp
```

## ログライブラリの作成

```bash
npx nx generate @nx/node:library utils/log/logger --tags=lib:utils
npx nx generate @nx/nest:library utils/log/nest-logger --tags=lib:utils
npx nx generate @nx/nest:service --name=atLogger --project=utils-log-nest-logger --directory=lib
```

## モデルライブラリの作成

```bash

## bffのsite向けモデルライブラリの作成
npx nx generate @nx/node:library bff-site --directory=models --tags=lib:models-bff-site

```
