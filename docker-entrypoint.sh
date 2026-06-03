#!/bin/sh
set -e

echo "=== Running Prisma migrations ==="
npx prisma migrate deploy

echo "=== Migrations done. Starting Next.js server ==="
node server.js
