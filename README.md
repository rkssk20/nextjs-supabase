## Next.js × Supabase

[Next.js × Supabase](https://nextjs-supabase.tk)

Next.js と Supabase を使用した技術ブログ風のポートフォリオです。ログイン・投稿・いいね・コメントなどをお試しください

[Hasura 版](https://nextjs-hasura.tk)と[Firebase 版](https://nextjs-firebase)もあります

<br>

## 技術選定

### フロント

- Next.js
- Typescript
- Recoil
- Mui (旧 Material UI)
- SCSS

### サーバー

- Supabase (認証、DB、API、ストレージ)

### ホスティング

- Vercel

### その他

- ESlint, Prettier
- Google Analytics

<br>

## 実装した機能

### CRUD

- 記事・コメント・返信の投稿、削除
- 記事・コメント・返信へのいいね
- アカウント作成、削除、プロフィール変更
- ユーザーのフォロー
- 記事の画像・アバター画像のアップロード

など

### 検索履歴、下書き

- Recoil (Persist)

### レスポンシブデザイン

- Mui と SCSS

### トレンド一覧

- Google Analytics で PV 数を測定
- Google Analytics Data API で人気のページを取得

### Markdown

- エディターは react-simplemde-editor
- unified で変換して表示

### 無限スクロール

- Intersection Observer API で ref を監視

### 検索

- iLike で部分一致
