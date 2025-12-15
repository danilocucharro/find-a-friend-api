import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository.js";
import { GetPetInfoUseCase } from "../get-pet-info.js";

export function makeGetPetInfoUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetInfoUseCase = new GetPetInfoUseCase(petsRepository);

  return getPetInfoUseCase;
}
