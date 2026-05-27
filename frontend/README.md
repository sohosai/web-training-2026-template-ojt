# frontend

Vite + React + TypeScript のフロントエンドテンプレート。

## スタック

- Vite 6
- React 19
- TypeScript

## 開発の始め方

```bash
pnpm install
pnpm dev
```

http://localhost:5173 で起動します。

`/api/*` へのリクエストは `vite.config.ts` の proxy 設定で
backend (http://localhost:3000) に転送されます。
そのため backend を別途起動しておいてください（`backend/README.md` 参照）。

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | Vite dev server を起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm preview` | ビルド結果のプレビュー |
| `pnpm typecheck` | 型チェック |
