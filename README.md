# フロント立ち上げ

## 事前作業

Module のインストールと husky の初期化  
`npx husky-init && npm install`

husky 設定  
`npx husky set .husky/pre-commit "npx lint-staged"`

### Prettier、defaultFormatter 設定

保存時に自動フォーマットをかけてコードの品質を保つ

#### Prettier のインストール

VSCode の拡張機能タブから**Prettier -Code formatter**をインストールする  
インストールを推奨されているはずです

#### 設定

1. VSCode の設定を開く  
   画面左下の**設定アイコン**から**Settings**を選択する  
   また windows の場合 **ctrl + ,** でも可

2. defaultformatter 設定検索  
   設定画面上部の**設定の検索**で**defaultformatter**と検索する

3. defaultformatter 設定  
   **Default Formatter**のプルダウンメニューで**esbenp.prettier-vscode**を選択する

4. save 設定検索
   設定画面上部の**設定の検索**で**save**と検索する

5. Format On Save 設定
   **Format On Save**にチェックマークを入れ有効化する

6. VSCode を再起動する
   一度 window を閉じ、再度開く

## コミット

コミットする際は下記を実行すること  
1 `git add .` or `git add ファイル名`  
2 `git commit`  
3 開いたコミットファイルにコミットメッセージを入力する

```text
例: CSITE-{チケット番号}_【注文住宅】{チケット名}
    add: page
```

## フロントエンド

### **サーバサイドレンダリングを使用しない場合**

1. ビルド実行  
   `npm run build`
2. 起動する  
   `npm run start`  
    localhost:4200 にアクセスできるようになる。
3. 起動する（port 指定）  
   `npm run start:port ポート番号`  
    localhost:ポート番号 にアクセスできるようになる。

### **サーバサイドレンダリングを使用しない場合(Node スクリプト版)**

1. ビルド実行  
   `npx nx run at-customhouse-conpane:build`

2. 起動する  
   `npx nx serve at-customhouse-conpane`  
    localhost:4200 にアクセスできるようになる。

3. 起動する（port 指定）  
    `npx nx serve at-customhouse-conpane --port ポート番号`  
   localhost:ポート番号 にアクセスできるようになる。

## BFF

1. ビルドする  
   `npm run build:bff`
2. 起動する  
   `npm run start:bff`  
   localhost:3333 にアクセスできるようになる
