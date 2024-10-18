# Zoom Meeting SDK App サンプル

このサンプルアプリの使用は、[利用規約](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/)に従います。

このリポジトリは、[Vite](https://vitejs.dev/)によって生成された[React](https://reactjs.org/)アプリで、[Zoom Meeting SDK](https://developers.zoom.us/docs/meeting-sdk/web/)を使用してZoom会議やウェビナーを開始および参加します。

![Zoom Meeting SDK クライアントビュー](/public/images/meetingsdk-web-client-view.gif)

## インストール

まず、リポジトリをクローンします：

`$ git clone https://github.com/zoom/meetingsdk-react-sample.git`

## セットアップ

1. クローンしたら、`zoom-meetingsdk-app`ディレクトリに移動します：

   `$ cd zoom-meetingsdk-app`

1. 依存関係をインストールします：

   `$ npm install`

1. `zoom-meetingsdk-app`ディレクトリをコードエディタで開きます。

1. `src/App.tsx`ファイルを開き、次の変数に値を入力します：

   **NEW:** [Component View](https://developers.zoom.us/docs/meeting-sdk/web/component-view/)を使用するには、`App.tsx`を`App-New.tsx`に置き換えます。（`leaveUrl`は不要です）

   | 変数名                     | 説明 |
   | -----------------------|-------------|
   | authEndpoint          | 必須、Meeting SDK JWTを安全に生成するあなたのMeeting SDK認証エンドポイント。 [ここで認証エンドポイントを取得できます](https://github.com/zoom/meetingsdk-sample-signature-node.js)。 |
   | sdkKey                   | 必須、Zoom Meeting SDKキーまたは2023年2月11日以降に作成されたMeeting SDKアプリタイプ用のクライアントID。[こちらで取得できます](https://developers.zoom.us/docs/meeting-sdk/developer-accounts/#get-meeting-sdk-credentials)。 |
   | meetingNumber                   | 必須、Zoom会議またはウェビナー番号。 |
   | passWord                   | 任意、会議のパスワード。パスワードが不要な場合は空文字列を指定。 |
   | role                   | 必須、`0`は参加者、`1`はホストを指定。 |
   | userName                   | 必須、会議/ウェビナーに参加/開始するユーザーの名前。 |
   | userEmail                   | ウェビナーには必須、会議には任意、[登録が必要な場合](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration)は会議/ウェビナーにも必須。会議/ウェビナーに参加または開始するユーザーのメールアドレス。 |
   | registrantToken            | [登録が必要な](https://developers.zoom.us/docs/meeting-sdk/web/client-view/meetings/#join-meeting-with-registration-required)会議または[ウェビナー](https://developers.zoom.us/docs/meeting-sdk/web/client-view/webinars/#join-webinar-with-registration-required)の場合に必要。 |
   | zakToken            | 他のZoomユーザーの代理で会議やウェビナーを開始するために必要。 [認証されたZoomユーザーのZAKトークン](https://developers.zoom.us/docs/meeting-sdk/auth/#start-meetings-and-webinars-with-a-zoom-users-zak-token)。 ZAKは[認証済み参加者](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063837)として参加するためにも使用可能。 |
   | leaveUrl                   | クライアントビューに必要、会議が終了した後にユーザーが遷移するURL。 |

   例:

   ```js
   var authEndpoint = 'http://localhost:4000'
   var sdkKey = 'abc123'
   var meetingNumber = '123456789'
   var passWord = ''
   var role = 0
   var userName = 'React'
   var userEmail = ''
   var registrantToken = ''
   var zakToken = ''
   var leaveUrl = 'http://localhost:5173'
   ```

1. `App.tsx`を保存します。

1. アプリを起動します：

   `$ npm run dev`

## 使用方法

1. http://localhost:5173 にアクセスし、「Join Meeting」をクリックします。

   ### クライアントビュー

   ![Zoom Meeting SDK クライアントビュー](/public/images/meetingsdk-web-client-view.gif)

   ### コンポーネントビュー

   ![Zoom Meeting SDK コンポーネントビュー](/public/images/meetingsdk-web-component-view.gif)

   [ギャラリービューの要件](https://developers.zoom.us/docs/meeting-sdk/web/gallery-view/)について詳しく学び、[製品のスクリーンショット](https://developers.zoom.us/docs/meeting-sdk/web/gallery-view/#how-views-look-with-and-without-sharedarraybuffer)を参照してください。

## デプロイメント

Reactサンプルアプリは、[GitHub Pages](#github-pages)や[AWS S3バケット](#other-static-web-hosting)のような静的Webホスティングサービスに簡単にデプロイできます。

### GitHub Pages

1. [GitHub](https://github.com)でリポジトリを作成します。

1. プロジェクトにリモートを追加します：

   `$ git remote add origin GITHUB_URL/GITHUB_USERNAME/GITHUB_REPO_NAME.git`

1. `package.json`ファイルを開き、5行目の`homepage`の値`""`を、リポジトリ名にスラッシュをつけた形に変更します：`"/GITHUB_REPO_NAME"`。

1. プロジェクトをビルドします：

   `$ npm run build`

1. `build`フォルダの名前を`docs`に変更します。

1. プロジェクトをGitに追加、コミット、プッシュします：

   `$ git add -A`

   `$ git commit -m "deploying to github"`

   `$ git push origin master`

1. GitHubのリポジトリで「設定」ページに移動し、「GitHub Pages」セクションまでスクロールして、「master branch/docsフォルダ」をソースとして選択します。

1. あなたのプロジェクトは、https://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME にデプロイされます。

### その他の静的Webホスティング

1. プロジェクトをビルドします：

   `$ npm run build`

1. コンパイルされた`/build`ディレクトリをAWS S3バケットのような静的Webホスティングサービスにデプロイします。

### 高度なデプロイ

より高度なデプロイ手順については、[Viteのデプロイドキュメント](https://vitejs.dev/guide/build.html#deployment)を参照してください。
