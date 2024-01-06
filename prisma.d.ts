// types/prisma.d.ts
import { PrismaClient } from "@prisma/client";

// Extend the global NodeJS namespace to add the `prisma` property
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

// Export the PrismaClient type for usage in other parts of your application
export type { PrismaClient };
