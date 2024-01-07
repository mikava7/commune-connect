"use client";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormsSchema = z.object({
  id: z.number(),
  authorId: z.number({ invalid_type_error: "Please sign in" }),
  fileUrl: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

const CreatePost = FormsSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    authorId?: string[] | undefined;
    fileUrl?: string[] | undefined;
    title?: string[] | undefined;
    content?: string[] | undefined;
    published?: string[] | undefined;
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  //Validate form fields using Zod
  const validatedFields = CreatePost.safeParse({
    authorId: formData.get("authorId"),
    fileUrl: formData.get("fileUrl"),
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published") === "true",
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  //Prepare data for insection into the database
  const { authorId, fileUrl, title, content, published } = validatedFields.data;

  try {
    const newPost = await prisma.post.create({
      data: {
        authorId,
        fileUrl,
        title,
        content,
        published,
      },
    });
    revalidatePath("/");
    redirect("/");
    // Handle success (e.g., return the new post)
    return { message: "Post created successfully", post: newPost };
  } catch (error) {
    // Handle errors (e.g., return an error message)
    return { errors: { message: "Failed to create post." } };
  } finally {
    await prisma.$disconnect();
  }
}
