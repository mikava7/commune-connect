import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });
    const hashedPassword = await hash(password, 10);
    // Add validation using Zod schema
    const parsedCredentials = z
      .object({ email: z.string().email(), hashedPassword: z.string().min(6) })
      .parse({ email, hashedPassword });
    const existingUser = await prisma.member.findUnique({
      where: {
        email: parsedCredentials.email,
      },
    });
    if (existingUser) {
      console.log("User with this email already exists");
      return NextResponse.json({
        message: "User with this email already exists",
        error: "USER_ALREADY_EXISTS",
      });
    } else {
      const user = await prisma.member.create({
        data: {
          email: parsedCredentials.email,
          password: parsedCredentials.hashedPassword,
          name: "Default Name",
          address: "Default address",
          imageLink: "name",
        },
      });
    }
  } catch (error) {
    console.log({ message: "error", error });
    return NextResponse.json({
      message: "An unexpected error occurred",
      error: "UNEXPECTED_ERROR",
    });
  }
  return NextResponse.json({ message: "success" });
}
