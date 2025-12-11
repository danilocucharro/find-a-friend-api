import type { Pet, Prisma } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.js";
import { prisma } from "src/lib/prisma.js";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async findById(petId: string) {
    const searchedPet = await prisma.pet.findFirst({
      where: {
        id: petId,
      },
    });

    return searchedPet;
  }

  async fetchPetsByCityAndPetInfo(
    city: string,
    age?: string,
    energy_level?: number,
    environment?: string,
    independency?: string,
    size?: string
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        age: age ?? "",
        energy_level: energy_level ?? 3,
        environment: environment ?? "",
        independency: independency ?? "",
        size: size ?? "",
      },
    });

    return pets;
  }
}
