import type { FastifyReply, FastifyRequest } from "fastify";
import { ContentNotFoundError } from "src/use-cases/errors/content-not-found-error.js";
import { PermissionDeniedError } from "src/use-cases/errors/permission-denied-error.js";
import { makeCreatePetUseCase } from "src/use-cases/factories/make-create-pet-use-case.js";
import z from "zod";

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();

  const createPetSchema = z.object({
    about: z.string().nullable(),
    age: z.string(),
    energy_level: z.string(),
    environment: z.string(),
    independency: z.string(),
    name: z.string(),
    size: z.string(),
  });

  const { about, age, energy_level, environment, independency, name, size } =
    createPetSchema.parse(request.body);
  try {
    const createPetUseCase = makeCreatePetUseCase();

    const { pet } = await createPetUseCase.execute({
      about,
      age,
      energy_level,
      environment,
      independency,
      name,
      size,
      org_id: request.user.sub,
    });

    return reply.status(201).send(pet);
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    if (error instanceof PermissionDeniedError) {
      return reply.status(403).send({
        message: error.message,
      });
    }
  }
}
