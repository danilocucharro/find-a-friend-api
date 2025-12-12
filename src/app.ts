import Fastify, { type FastifyReply } from "fastify";
import { organizationsRoutes } from "./http/controllers/organizations/routes.js";
import z, { ZodError } from "zod";

export const app = Fastify();

organizationsRoutes(app);

app.setErrorHandler((error: Error, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    reply.status(500).send({
      message: z.treeifyError(error),
    });
  }
  reply.status(500).send({
    message: error.message,
  });
});
