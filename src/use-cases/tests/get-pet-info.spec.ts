import { describe, expect, it } from "vitest";
import { createOrgAndAuthenticate } from "../utils/tests/create-org-and-authenticate.js";
import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository.js";
import { CreatePetUseCase } from "../create-pet.js";
import { GetPetInfoUseCase } from "../get-pet-info.js";
import { ContentNotFoundError } from "../errors/content-not-found-error.js";

describe("Get Pet Info Use Case", () => {
  it("should be able to get a pet details", async () => {
    const { org } = await createOrgAndAuthenticate();

    const createPet = {
      about: "Um cachorro vira-lata caramelo bem fofinho",
      age: "Filhote",
      energy_level: 5,
      environment: "Ambiente amplo",
      independency: "Baixo",
      city: org.city,
      name: "Jumanji",
      org_id: org.id,
      size: "Pequenino",
    };

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(petsRepository);

    const { pet } = await createPetUseCase.execute(createPet);

    const getPetInfoUseCase = new GetPetInfoUseCase(petsRepository);

    const searchedPet = await getPetInfoUseCase.execute({ petId: pet.id });

    expect(searchedPet.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      })
    );
  });

  it("should NOT be able to get a pet details", async () => {
    const { org } = await createOrgAndAuthenticate();

    const createPet = {
      about: "Um cachorro vira-lata caramelo bem fofinho",
      age: "Filhote",
      energy_level: 5,
      environment: "Ambiente amplo",
      independency: "Baixo",
      city: org.city,
      name: "Jumanji",
      org_id: org.id,
      size: "Pequenino",
    };

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(petsRepository);

    const { pet } = await createPetUseCase.execute(createPet);

    const getPetInfoUseCase = new GetPetInfoUseCase(petsRepository);

    await getPetInfoUseCase.execute({ petId: pet.id });

    await expect(
      async () => await getPetInfoUseCase.execute({ petId: "mocked-id" })
    ).rejects.toBeInstanceOf(ContentNotFoundError);
  });
});
