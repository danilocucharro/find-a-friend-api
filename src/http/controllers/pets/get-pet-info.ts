import type { FastifyReply, FastifyRequest } from "fastify";
import { ContentNotFoundError } from "src/use-cases/errors/content-not-found-error.js";
import { makeGetPetInfoUseCase } from "src/use-cases/factories/make-get-pet-info-use-case.js";
import z from "zod";

export async function GetPetInfoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetParamsSchema.parse(request.query);

  try {
    const getPetInfoUseCase = makeGetPetInfoUseCase();

    const { pet } = await getPetInfoUseCase.execute({ petId: id });

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      return reply.status(204).send({ message: error.message });
    }
  }
}
