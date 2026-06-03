#!/bin/sh
set -e

echo "=== Running Prisma migrations ==="
./node_modules/.bin/prisma migrate deploy

echo "=== Migrations done. Starting Next.js server ==="
node server.js
