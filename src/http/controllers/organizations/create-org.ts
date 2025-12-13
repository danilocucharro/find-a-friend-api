import type { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/use-cases/errors/org-already-exists-error.js";
import { makeCreateOrgUseCase } from "src/use-cases/factories/make-create-org-use-case.js";
import z from "zod";

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrgSchema = z.object({
    address: z.string(),
    city: z.string(),
    email: z.email(),
    name: z.string(),
    password: z.string(),
    phone: z.string().max(11),
    state: z.string().max(2),
  });

  const { address, city, email, name, password, phone, state } =
    createOrgSchema.parse(request.body);

  try {
    const createOrgUseCase = makeCreateOrgUseCase();

    await createOrgUseCase.execute({
      address,
      city,
      email,
      name,
      password,
      phone,
      state,
    });

    return reply.status(201).send({
      organization: {
        address,
        city,
        email,
        name,
        phone,
        state,
      },
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
  }
}
