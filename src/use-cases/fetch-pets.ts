import type { Pet } from "@prisma/client";
import { ContentNotFoundError } from "./errors/content-not-found-error.js";
import type { PetsRepository } from "src/repositories/pets-repository.js";

interface FetchPetsUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: number;
  independency?: string;
  environment?: string;
}

export interface FetchPetsUseCaseResponse {
  pets: Pet[] | null;
}

export class FetchPetsUseCase {
  public petsRepository: PetsRepository;

  constructor(orgsRepository: PetsRepository) {
    this.petsRepository = orgsRepository;
  }

  async execute({
    city,
    age,
    energy_level,
    environment,
    independency,
    size,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchPetsByCityAndPetInfo(
      city,
      age,
      energy_level,
      environment,
      independency,
      size
    );

    if (!pets) throw new ContentNotFoundError();

    return { pets };
  }
}
