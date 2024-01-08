const { PrismaClient } = require("@prisma/client");
const { books } = require("../app/lib/books.data.js");
const { members } = require("../app/lib/member.data.js");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const load = async () => {
  try {
    // Delete existing books to avoid duplicates in the database
    await prisma.member.deleteMany();
    // Create new members in the database using the data from the imported file
    const membersWithHashedPasswords = members.map((member) => ({
      ...member,
      password: bcrypt.hashSync(member.password, 10), // Hash password with bcrypt
    }));
    await prisma.member.createMany({
      data: membersWithHashedPasswords,
    });
    console.log("members are created");
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect the PrismaClient to release the database connection
    await prisma.$disconnect();
  }
};
load();

//**-------------------------------------------------------------- */
/*
const load = async () => {
  try {
    // Delete existing books to avoid duplicates in the database
    await prisma.book.deleteMany();
    // Create new books in the database using the data from the imported file

    await prisma.book.createMany({
      data: books,
    });
    console.log("Books are created");
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect the PrismaClient to release the database connection
    await prisma.$disconnect();
  }
};*/
