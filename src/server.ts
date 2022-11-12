import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function bootstrap() {
  const fastify = Fastify();

  fastify.get("/blogPost", async (request, reply) => {
    const blogPost = await prisma.blogPost.findMany();

    return reply.status(200).send({ blogPost });
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();
