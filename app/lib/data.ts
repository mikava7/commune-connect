// fetchBooks.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Book } from "./definitions";
export async function fetchBooks(): Promise<Book[]> {
  try {
    // Fetch books from the database using Prisma
    const books = await prisma.book.findMany({
      take: 5,
      orderBy: { id: "desc" },
    });

    // Return the fetched data directly (an array of books)
    return books;
  } catch (error: any) {
    // Handle errors by throwing an exception
    throw new Error("Failed to fetch books: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await prisma.$disconnect();
  }
}
