import type { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "src/use-cases/errors/bad-request-error.js";
import { ContentNotFoundError } from "src/use-cases/errors/content-not-found-error.js";
import { makeFetchPetsUseCase } from "src/use-cases/factories/make-fetch-pets-use-case.js";
import z from "zod";

export async function fetchPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsParamsSchema = z.object({
    city: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independency: z.string(),
    environment: z.string(),
  });

  const { age, city, energy_level, environment, independency, size } =
    fetchPetsParamsSchema.parse(request.query);

  try {
    const fetchPetsUseCase = makeFetchPetsUseCase();

    const { pets } = await fetchPetsUseCase.execute({
      city,
      age,
      energy_level,
      environment,
      independency,
      size,
    });

    return reply.status(200).send({
      pets,
    });
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    if (error instanceof BadRequestError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}
