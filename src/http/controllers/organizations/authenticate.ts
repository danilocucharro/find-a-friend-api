import type { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error.js";
import { makeAuthenticateUseCase } from "src/use-cases/factories/make-authenticate-use-case.js";
import z from "zod";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    throw error;
  }
}
