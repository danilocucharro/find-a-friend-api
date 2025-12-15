import type { Pet } from "@prisma/client";
import type { OrgsRepository } from "src/repositories/orgs-repository.js";
import type { PetsRepository } from "src/repositories/pets-repository.js";
import { ContentNotFoundError } from "./errors/content-not-found-error.js";
import { PermissionDeniedError } from "./errors/permission-denied-error.js";

interface CreatePetUseCaseRequest {
  name: string;
  about: string | null;
  energy_level: string;
  size: string;
  age: string;
  independency: string;
  environment: string;
  org_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  private petsRepository: PetsRepository;
  private orgsRepository: OrgsRepository;

  constructor(petsRepository: PetsRepository, orgsRepository: OrgsRepository) {
    this.petsRepository = petsRepository;
    this.orgsRepository = orgsRepository;
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
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new ContentNotFoundError();
    }

    if (org.id !== org_id) {
      throw new PermissionDeniedError();
    }

    const pet = await this.petsRepository.create({
      age,
      energy_level,
      environment,
      independency,
      name,
      org_id: org.id,
      size,
      about,
      city: org.city,
    });

    return { pet };
  }
}
