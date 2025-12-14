import { PrismaOrgsRepository } from "src/repositories/prisma/prisma-orgs-repository.js";
import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository.js";
import { CreatePetUseCase } from "../create-pet.js";

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();

  const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository);

  return createPetUseCase;
}
