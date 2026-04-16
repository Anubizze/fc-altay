#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [[ ! -f frontend/package.json ]]; then
  echo "[flatten] Нет frontend/package.json — уже в корне?"
  exit 1
fi

echo "[flatten] Копирование src..."
cp -a frontend/src ./src

mkdir -p public
if [[ -d frontend/public ]]; then
  echo "[flatten] Копирование public..."
  cp -a frontend/public/. ./public/
fi

cp frontend/package.json frontend/pnpm-lock.yaml frontend/next.config.mjs frontend/tsconfig.json \
  frontend/next-env.d.ts frontend/vercel.json frontend/.nvmrc frontend/.npmrc frontend/.gitignore ./
cp frontend/.eslintrc.json ./

echo "[flatten] Удаление frontend..."
rm -rf frontend

echo "[flatten] Готово. Дальше: pnpm install"
