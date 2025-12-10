import type { Pet } from "@prisma/client";
import type { PetsRepository } from "src/repositories/pets-repository.js";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  energy_level: number;
  size: string;
  age: string;
  independency: string;
  environment: string;
  org_id: string;
  city: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  private petsRepository: PetsRepository;

  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({
    about,
    age,
    energy_level,
    environment,
    independency,
    name,
    org_id,
    size,
    city,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      energy_level,
      environment,
      independency,
      name,
      org_id,
      size,
      about,
      city,
    });

    return { pet };
  }
}
