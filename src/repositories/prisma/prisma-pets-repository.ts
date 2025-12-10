import type { Prisma } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.js";
import { prisma } from "src/lib/prisma.js";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
}
