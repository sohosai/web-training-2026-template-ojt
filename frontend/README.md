# frontend

Vite + React + TypeScript のフロントエンドテンプレート。

## スタック

- Vite 6
- React 19
- TypeScript

## 開発の始め方

```bash
npm install
npm run dev
```

http://localhost:5173 で起動します。

`/api/*` へのリクエストは `vite.config.ts` の proxy 設定で
backend (デフォルト: http://localhost:3000) に転送されます。
そのため backend を別途起動しておいてください（`backend/README.md` 参照）。

プロキシ先の origin は環境変数 `VITE_API_ORIGIN` で変更できます。
`.env.example` をコピーして `.env` を作成し、必要に応じて書き換えてください。

```bash
cp .env.example .env
```

未設定の場合は `http://localhost:3000` が使われます。

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | Vite dev server を起動 |
| `npm run build` | プロダクションビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run typecheck` | 型チェック |
