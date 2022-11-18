import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function bootstrap() {
  const fastify = Fastify();

  fastify.get("/blogPost", async (request, reply) => {
    const blogPost = await prisma.blogPost.findMany();

    return reply.status(200).send(blogPost);
  });

  fastify.post("/blogPost", async (request, reply) => {
    const body = JSON.parse(request.body);

    const blogPost = await prisma.blogPost.create({
      data: {
        title: body.title,
        name: body.name,
        body: body.body,
        category: body.category,
      },
    });

    return reply.status(201).send({ blogPost });
  });

  await fastify.listen({ port: 8000, host: "0.0.0.0" });
  console.log("API: 0.0.0.0:8000");
}

bootstrap();
