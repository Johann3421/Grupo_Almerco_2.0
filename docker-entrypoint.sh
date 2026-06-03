#!/bin/sh
# Startup script for Docker container:
# 1. Run pending Prisma migrations
# 2. Start the Next.js server

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting Next.js server..."
node server.js
