import type { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  fetchPetsByCityAndPetInfo(
    city: string,
    age?: string,
    energy_level?: number,
    environment?: string,
    independency?: string,
    size?: string
  ): Promise<Pet[] | undefined>;
  findById(petId: string): Promise<Pet | null>;
}
