import type { Pet } from "@prisma/client";
import { ContentNotFoundError } from "./errors/content-not-found-error.js";
import type { PetsRepository } from "src/repositories/pets-repository.js";
import { BadRequestError } from "./errors/bad-request-error.js";

interface FetchPetsUseCaseRequest {
  city: string;
  age: string;
  size: string;
  energy_level: string;
  independency: string;
  environment: string;
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
    if (!city || city === "") {
      throw new BadRequestError();
    }

    const pets = await this.petsRepository.fetchPetsByCityAndPetInfo(
      city,
      age,
      energy_level,
      environment,
      independency,
      size
    );

    if (!pets || pets.length === 0) throw new ContentNotFoundError();

    return { pets };
  }
}
