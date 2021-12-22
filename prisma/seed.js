const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const john = await prisma.user.create({
    data: {
      username: "john",
      // Hash for password - twixrox
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    getPosts().map((post) => {
      const data = { userId: john.id, ...post };
      return prisma.post.create({ data });
    })
  );
}

seed();

function getPosts() {
  return [
    {
      title: "PHP",
      body: "A body about Php",
    },
    {
      title: "Javascript",
      body: "A body about Javascript",
    },
    {
      title: "Python",
      body: "A body about python",
    },
    {
      title: "Typescript",
      body: "A body about typescript",
    },
    {
      title: "Nodejs",
      body: "A body about nodejs",
    },
  ];
}
