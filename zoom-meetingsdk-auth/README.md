# Zoom Meeting SDK 認証エンドポイントサンプル

このサンプルアプリの使用は、[利用規約](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/)に従います。

これは、[Zoom Meeting SDK](https://developers.zoom.us/docs/meeting-sdk/)の認証に必要な[Meeting SDK JWT](https://developers.zoom.us/docs/meeting-sdk/auth/#generate-a-meeting-sdk-jwt)をHTTPリクエスト経由で生成するNode.js/Expressサーバーです。

これらの手順をスキップして、完成したコードを管理サービスにデプロイしたい場合は、Railway、Render、Herokuの「Deploy」ボタンをクリックしてください。（いくつかの設定が必要なので、[デプロイメント](#deployment)を参照してください。）

| Railway | Render | Heroku |
|:-:|:-:|:-:|
| [![Railwayでデプロイ](https://railway.app/button.svg)](https://railway.app/template/JsX6Pk?referralCode=HTPdHX) | [![Renderでデプロイ](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/zoom/meetingsdk-auth-endpoint-sample) | [![デプロイ](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/zoom/meetingsdk-auth-endpoint-sample) |

> 注意: Railway と Render には無料プランがありますが、Heroku ではデプロイにクレジットカードが必要です。

## インストール

ターミナルで、以下のコマンドを実行してリポジトリをクローンします：

`$ git clone https://github.com/zoom/meetingsdk-auth-endpoint-sample.git`

## セットアップ

1. ターミナルで、クローンしたリポジトリに移動します：

   `$ cd zoom-meetingsdk-auth`

1. 依存関係をインストールします：

   `$ npm install`

2. `.env.example` を `.env` にリネームし、ファイルの内容を編集して[Zoom Meeting SDKのキーとシークレット](https://developers.zoom.us/docs/meeting-sdk/developer-accounts/)を含め、ファイルを保存して閉じます。

3. サーバーを起動します：

   `$ npm run start`

## 使用方法

以下のリクエストボディを使って、`http://localhost:4000`（またはデプロイ済みのURL）にPOSTリクエストを送信します：

| プロパティ         | 型       | 必須か?      | 検証ルール                                                                           |
| ------------------ | -------- | ------------ | ------------------------------------------------------------------------------------ |
| `meetingNumber`     | `string` | 必須（Web）  | - Web JWTを生成する場合に必須、ネイティブの場合は任意                                 |
| `role`              | `number` | 必須（Web）  | - Web JWTを生成する場合に必須、ネイティブの場合は任意。<br> - `0` または `1` のみ有効 |
| `expirationSeconds` | `number` | いいえ       | - `1800`（30分）から `172800`（48時間）の間で指定                                     |

> [!重要]
> `meetingNumber`または`role`がリクエストボディに含まれる場合、もう一方も必須です。両方が提供されている場合、JWTはWeb用として有効になります。そうでない場合はネイティブ用として有効です。

### リクエスト例

POST `http://localhost:4000`

リクエストボディ：

```json
{
  "meetingNumber": "123456789",
  "role": 0
}
```

成功すると、レスポンスボディは以下のようにMeeting SDK JWTのJSON表現となります：

```json
{
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJhYmMxMjMiLCJtbiI6IjEyMzQ1Njc4OSIsInJvbGUiOjAsImlhdCI6MTY0NjkzNzU1MywiZXhwIjoxNjQ2OTQ0NzUzLCJhcHBLZXkiOiJhYmMxMjMiLCJ0b2tlbkV4cCI6MTY0Njk0NDc1M30.UcWxbWY-y22wFarBBc9i3lGQuZAsuUpl8GRR8wUah2M"
}
```

[Meeting SDK](https://developers.zoom.us/docs/meeting-sdk/auth/#join-meetings-and-webinars-with-the-meeting-sdk-jwt) では、`signature` を `join()` 関数に渡します：

```js
// Meeting SDK JWT を取得するために、認証エンドポイントに HTTP リクエストを送信

// Meeting SDK - Web - クライアントビュー - 例：
ZoomMtg.join({
  signature: signature,
  sdkKey: sdkKey,
  userName: userName,
  meetingNumber: meetingNumber,
  passWord: password
})

// Meeting SDK - Web - コンポーネントビュー - 例：
client.join({
  signature: signature,
  sdkKey: sdkKey,
  userName: userName,
  meetingNumber: meetingNumber,
  password: password
})
```

## デプロイメント

### 管理サービスにデプロイ

1. 「Deploy to <プロバイダ>」ボタンをクリックした後、アプリ名を入力するか（または空欄のままにして自動生成される名前を使用する）、[Zoom Meeting SDKの資格情報](https://developers.zoom.us/docs/meeting-sdk/developer-accounts/#get-meeting-sdk-credentials)を挿入します：

   - `ZOOM_MEETING_SDK_KEY`（Zoom Meeting SDKキーまたは2023年2月11日以降に作成されたMeeting SDKアプリタイプ用のクライアントID）
   - `ZOOM_MEETING_SDK_SECRET`（Zoom Meeting SDKシークレットまたは2023年2月11日以降に作成されたMeeting SDKアプリタイプ用のクライアントシークレット）

1. その後「Deploy App」をクリックします。

1. URLをMeeting SDK認証エンドポイントとして使用します。

   例: `https://abc123.provider.com/`

```bash
$ curl <YOU_URL> -X POST -d '{  "role": "1", "meetingNumber": "123123123"}' -H "Content-Type: application/json"
```

### 他のサーバーホスティング

1. 他のサーバーホスティングについては、[こちらのチュートリアル](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#choosing_a_hosting_provider)を参照してください。

1. デプロイされたURLをMeeting SDK認証エンドポイントとして使用します。

   例: `https://abc123.compute-1.amazonaws.com/`

これで、[Meeting SDK JWTを生成](#usage)する準備が整いました。
