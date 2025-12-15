import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository.js";
import { FetchPetsUseCase } from "../fetch-pets.js";

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const fetchPetsUseCase = new FetchPetsUseCase(petsRepository);

  return fetchPetsUseCase;
}
