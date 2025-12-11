import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository.js";
import { describe, expect, it } from "vitest";
import { FetchPetsUseCase } from "../fetch-pets.js";
import { CreatePetUseCase } from "../create-pet.js";
import { createOrgAndAuthenticate } from "../utils/tests/createOrgAndAuthenticate.js";
import { ContentNotFoundError } from "../errors/ContentNotFoundError.js";
import { BadRequestError } from "../errors/BadRequestError.js";

describe("Fetch Pets Use Case", () => {
  it("should be able to search pets by city and pet infos", async () => {
    const { org } = await createOrgAndAuthenticate();

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(petsRepository);

    await createPetUseCase.execute({
      about: "sou um chahorro bonito e fofo",
      age: "Filhote",
      energy_level: 4,
      environment: "Ambiente amplo",
      independency: "Médio",
      name: "Jailson",
      org_id: org.id,
      size: "Pequenino",
      city: org.city,
    });

    await createPetUseCase.execute({
      about: "sou um chahorro bonito e fofo",
      age: "Adulto",
      energy_level: 3,
      environment: "Ambiente médio",
      independency: "Alta",
      name: "Juninho",
      org_id: org.id,
      size: "Grande",
      city: org.city,
    });

    const fetchPetsUseCase = new FetchPetsUseCase(petsRepository);

    const { pets } = await fetchPetsUseCase.execute({
      city: "Curitiba",
      age: "Filhote",
    });

    expect(pets).toEqual([
      expect.objectContaining({
        age: "Filhote",
        name: "Jailson",
        org_id: org.id,
        city: org.city,
      }),
    ]);
  });

  it("should NOT be able to search pets by city and pet infos", async () => {
    const { org } = await createOrgAndAuthenticate();

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(petsRepository);

    await createPetUseCase.execute({
      about: "sou um chahorro bonito e fofo",
      age: "Filhote",
      energy_level: 4,
      environment: "Ambiente amplo",
      independency: "Médio",
      name: "Jailson",
      org_id: org.id,
      size: "Pequenino",
      city: org.city,
    });

    await createPetUseCase.execute({
      about: "sou um chahorro bonito e fofo",
      age: "Adulto",
      energy_level: 3,
      environment: "Ambiente médio",
      independency: "Alta",
      name: "Juninho",
      org_id: org.id,
      size: "Grande",
      city: org.city,
    });

    const fetchPetsUseCase = new FetchPetsUseCase(petsRepository);

    await fetchPetsUseCase.execute({
      city: "São Paulo",
      age: "Adulto",
    });

    await expect(
      async () =>
        await fetchPetsUseCase.execute({
          city: "",
          age: "Adulto",
        })
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
