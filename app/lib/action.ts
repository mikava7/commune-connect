"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
const authorId = 41;
const FormSchema = z.object({
  id: z.number(),
  authorId: z.number({ invalid_type_error: "Please sign in" }),

  title: z.string(),
  content: z.string(),
});

const CreatePost = FormSchema.omit({ id: true, date: true });
const UpdatePost = FormSchema.omit({ date: true, id: true });

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

  try {
    await prisma.posts.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    console.log("In try block");

    // Handle success (e.g., return the new post)
    return { message: "Post created successfully" };
  } catch (error) {
    // Handle errors (e.g., return an error message)
    return { errors: { message: "Failed to create post." } };
  } finally {
    await prisma.$disconnect();
    console.log("In finally block");
    revalidatePath("/posts/");
    redirect("/posts/");
  }
}

export async function editPost(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdatePost.safeParse({
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

  const { title, content } = validatedFields.data;
  try {
    // Use Prisma to update the post with the specified ID
    const updatedPost = await prisma.posts.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });

    // Handle success (e.g., return the updated post)
    return { message: "Post edited successfully", post: updatedPost };
  } catch (error) {
    // Handle errors (e.g., return an error message)
    return { errors: { message: "Failed to edit post." } };
  } finally {
    // Disconnect from Prisma and trigger revalidation and redirection
    await prisma.$disconnect();
    revalidatePath("/posts/");
    redirect("/posts/");
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.posts.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { message: "Post deleted successfully" };
  } catch (error) {
    return { errors: { message: "Failed to delete post." } };
  } finally {
    // Disconnect from Prisma and trigger revalidation and redirection
    await prisma.$disconnect();
    revalidatePath("/posts/");
    redirect("/posts/");
  }
}
