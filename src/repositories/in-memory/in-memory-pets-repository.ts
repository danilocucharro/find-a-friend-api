import type { Prisma, Pet } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.js";
import { randomUUID } from "node:crypto";

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
      created_at: new Date(),
    };

    this.pet.push(pet);

    return pet;
  }
}
