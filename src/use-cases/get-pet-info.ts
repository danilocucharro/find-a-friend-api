import type { Pet } from "@prisma/client";
import type { PetsRepository } from "src/repositories/pets-repository.js";
import { ContentNotFoundError } from "./errors/content-not-found-error.js";

interface GetPetInfoUseCaseRequest {
  petId: string;
}

interface GetPetInfoUseCaseResponse {
  pet: Pet;
}

export class GetPetInfoUseCase {
  private petsRepository: PetsRepository;

  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({
    petId,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ContentNotFoundError();

    return { pet };
  }
}
