import type { Prisma, Pet } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.js";
import { randomUUID } from "node:crypto";
import { ContentNotFoundError } from "src/use-cases/errors/content-not-found-error.js";
import { BadRequestError } from "src/use-cases/errors/bad-request-error.js";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
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

    this.pets.push(pet);

    return pet;
  }

  async findById(petId: string) {
    const searchedPet = this.pets.find((pet) => pet.id === petId);

    if (!searchedPet) return null;

    return searchedPet;
  }

  async fetchPetsByCityAndPetInfo(
    city: string,
    age: string,
    energy_level: string,
    environment: string,
    independency: string,
    size: string
  ) {
    if (!city) throw new BadRequestError();

    const filteredPets = this.pets.filter((pet) => {
      const cityCondition = pet.city === city;
      const ageCondition = !age || pet.age === age;
      const energyLevelCondition = !energy_level || pet.energy_level;
      const environmentCondition = !environment || pet.environment;
      const independencyCondition = !independency || pet.independency;
      const sizeCondition = !size || pet.size;

      return (
        cityCondition &&
        ageCondition &&
        energyLevelCondition &&
        environmentCondition &&
        independencyCondition &&
        sizeCondition
      );
    });

    if (!filteredPets) throw new ContentNotFoundError();

    return filteredPets;
  }
}
