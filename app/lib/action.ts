"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
const authorId = 41;
const FormsSchema = z.object({
  id: z.number(),
  authorId: z.number({ invalid_type_error: "Please sign in" }),

  title: z.string(),
  content: z.string(),
});

const CreatePost = FormsSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    authorId?: string[] | undefined;
    title?: string[] | undefined;
    content?: string[] | undefined;
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  //Validate form fields using Zod
  const validatedFields = CreatePost.safeParse({
    authorId: authorId,
    title: formData.get("title"),
    content: formData.get("content"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  //Prepare data for insection into the database
  const { title, content } = validatedFields.data;
  console.log("title", title);
  console.log("content", content);

  try {
    await prisma.posts.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    console.log("try");

    // Handle success (e.g., return the new post)
    return { message: "Post created successfully" };
  } catch (error) {
    // Handle errors (e.g., return an error message)
    return { errors: { message: "Failed to create post." } };
  } finally {
    await prisma.$disconnect();
    console.log("finally");
    revalidatePath("/posts/");
    redirect("/posts/");
  }
}
