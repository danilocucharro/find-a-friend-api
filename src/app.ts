import Fastify, { type FastifyReply } from "fastify";
import { organizationsRoutes } from "./http/controllers/organizations/routes.js";
import z, { ZodError } from "zod";
import { petsRoutes } from "./http/controllers/pets/routes.js";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env/index.js";

export const app = Fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

organizationsRoutes(app);
petsRoutes(app);

app.setErrorHandler((error: Error, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: "Validation Error.",
      issues: z.treeifyError(error),
    });
  }

  reply.status(500).send({
    message: "Internal server error.",
  });
});
