// fetchBooks.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import prisma from "./prisma";
import { Book, Member } from "./definitions";
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

export async function fetchMembers() {
  try {
    const members = await prisma.member.findMany({});
    return members;
  } catch (error: any) {
    // Handle errors by throwing an exception
    throw new Error("Failed to fetch members: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await prisma.$disconnect();
  }
}

export async function getUser(userId: string) {
  try {
    const member = await prisma.member.findUnique({
      where: {
        id: parseInt(userId), // Assuming member IDs are integers
      },
      include: {
        posts: true,
      },
    });

    return member;
  } catch (error: any) {
    // Handle errors by throwing an exception
    throw new Error("Failed to fetch user: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await prisma.$disconnect();
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.posts.findMany();
    return posts;
  } catch (error: any) {
    throw new Error("Failed to fetch posts: " + error.message);
  } finally {
    // Disconnect the Prisma client to release the database connection
    await prisma.$disconnect();
  }
}

// export async function createPost() {
//   const userId = 41;
//   const postData = {
//     title: "first Your Post Title",
//     content:
//       "// or false based on your requirementsYour Post Title // or false based on your requirements",

//     published: true, // or false based on your requirements
//     authorId: userId, // Assign the ID of the user who creates the post
//     // Other fields based on your model
//   };

//   try {
//     const createdPost = await prisma.posts.create({
//       data: postData,
//     });
//     console.log("Created post:", createdPost);
//   } catch (error) {
//     console.error("Error creating post:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// createPost();
