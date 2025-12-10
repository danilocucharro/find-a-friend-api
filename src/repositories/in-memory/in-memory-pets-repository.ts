import type { Prisma, Pet } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.js";
import { randomUUID } from "node:crypto";
import { ContentNotFoundError } from "src/use-cases/errors/ContentNotFoundError.js";

export class InMemoryPetsRepository implements PetsRepository {
  public pet: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? "",
      energy_level: data.energy_level,
      size: data.size,
      age: data.age,
      independency: data.independency,
      environment: data.environment,
      org_id: data.org_id,
      city: data.city,
      created_at: new Date(),
    };

    this.pet.push(pet);

    return pet;
  }

  async fetchPetsByCityAndPetInfo(
    city: string,
    age?: string,
    energy_level?: number,
    environment?: string,
    independency?: string,
    size?: string
  ) {
    const pets = this.pet.filter(
      (pet) =>
        pet.city === city &&
        (pet.age === age ||
          pet.energy_level === energy_level ||
          pet.environment === environment ||
          pet.independency === independency ||
          pet.size === size)
    );

    if (!pets) throw new ContentNotFoundError();

    return pets;
  }
}
