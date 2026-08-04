#!/bin/sh
set -e

echo "=== Running Prisma migrations ==="
node node_modules/prisma/build/index.js migrate deploy || true

echo "=== Running Prisma Seed ==="
node node_modules/prisma/build/index.js db seed || true

echo "=== Starting Next.js server ==="
node server.js
