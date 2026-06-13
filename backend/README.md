# backend

Hono + Drizzle (MySQL) のバックエンドテンプレート。

## スタック

- TypeScript
- [Hono](https://hono.dev/) (Node.js アダプタ)
- [Drizzle ORM](https://orm.drizzle.team/) + `mysql2`
- MySQL 8 / phpMyAdmin (docker compose)

## 開発の始め方

### 1. Docker でまるごと起動する

```bash
docker compose up --build
```

- API: http://localhost:3000
- phpMyAdmin: http://localhost:8080 （root / root）

`app` コンテナは起動時に `db:migrate` を自動実行するので、初回起動時に
`drizzle/` のマイグレーションが DB に適用される。手動でのスキーマ反映は不要。

スキーマ（`src/db/schema.ts`）を変更したら、マイグレーションを生成してから再起動する:

```bash
npm run db:generate
docker compose up --build
```

### 2. ローカル Node + Docker DB で起動する

```bash
docker compose up -d db phpmyadmin
cp .env.example .env
npm install
npm run db:push
npm run dev
```

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | `tsx watch` で開発サーバ起動 |
| `npm run build` | TypeScript を `dist/` にコンパイル |
| `npm start` | コンパイル済み JS を起動 |
| `npm run typecheck` | 型チェックのみ |
| `npm run db:generate` | スキーマからマイグレーションを生成 |
| `npm run db:push` | スキーマを DB にそのまま反映（開発用） |
| `npm run db:migrate` | 生成済みマイグレーションを適用 |
| `npm run db:studio` | Drizzle Studio を起動 |

## ディレクトリ

```
src/
  index.ts        - Hono エントリポイント
  db/
    schema.ts     - Drizzle スキーマ
    client.ts     - DB クライアント
  routes/
    users.ts      - サンプルルート
drizzle.config.ts
Dockerfile
docker-compose.yml
```

## サンプル API

```bash
curl http://localhost:3000/users
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com"}'
```
