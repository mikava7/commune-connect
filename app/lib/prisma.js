import { PrismaClient } from "@prisma/client";

let prisma;

// Check if the application is running in production
if (process.env.NODE_ENV === "production") {
  // If in production, create a new instance of PrismaClient
  prisma = new PrismaClient();
} else {
  // If not in production, check if a global PrismaClient instance exists
  if (!global.prisma) {
    // If not, create a new instance and assign it to the global object
    global.prisma = new PrismaClient();
  }

  // Use the global PrismaClient instance
  prisma = global.prisma;
}

export default prisma;
