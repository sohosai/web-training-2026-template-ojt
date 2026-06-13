# web-training-2026-template

雙峰祭オンラインシステム開発班の研修テンプレート。

## 構成

```
backend/   - Hono + Drizzle (MySQL) + Docker
frontend/  - Vite + React + TypeScript
```

それぞれ独立した npm プロジェクトです。詳細は各ディレクトリの README を参照。

## クイックスタート

ターミナルを 2 つ用意して、

**backend**

```bash
cd backend
docker compose up --build
# 初回起動時にマイグレーションが自動で適用される
```

- API: http://localhost:3000
- phpMyAdmin: http://localhost:8080 (root / root)

**frontend**

```bash
cd frontend
npm install
npm run dev
```

- http://localhost:5173
