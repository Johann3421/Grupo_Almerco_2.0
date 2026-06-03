import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prisma should NEVER run in the browser
export const prisma = 
  globalForPrisma.prisma ?? 
  (typeof window === "undefined" ? new PrismaClient() : null as any);

if (process.env.NODE_ENV !== "production") {
  if (typeof window === "undefined") globalForPrisma.prisma = prisma;
}
