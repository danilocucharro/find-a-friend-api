import { PrismaOrgsRepository } from "src/repositories/prisma/prisma-orgs-repository.js";
import { CreateOrgUseCase } from "../create-org.js";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

  return createOrgUseCase;
}
