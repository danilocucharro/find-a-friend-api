import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository.js";
import { describe, expect, it } from "vitest";
import { FetchPetsUseCase } from "../fetch-pets.js";
import { CreatePetUseCase } from "../create-pet.js";
import { createOrgAndAuthenticate } from "../utils/tests/create-org-and-authenticate.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { CreateOrgUseCase } from "../create-org.js";
import { AuthenticateUseCase } from "../authenticate.js";

describe("Fetch Pets Use Case", () => {
  it("should be able to search pets by city and pet infos", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

    const createOrg = {
      name: "Seu pet feliz",
      address: "Rua das pedras 23",
      city: "Curitiba",
      state: "PR",
      email: "seupetfeliz@email.com",
      password: "123456",
      phone: "11999999999",
    };

    await createOrgUseCase.execute(createOrg);

    const authenticateUseCase = new AuthenticateUseCase(orgsRepository);
    const { org } = await authenticateUseCase.execute({
      email: "seupetfeliz@email.com",
      password: "123456",
    });

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(
      petsRepository,
      orgsRepository
    );

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
    const orgsRepository = new InMemoryOrgsRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

    const createOrg = {
      name: "Seu pet feliz",
      address: "Rua das pedras 23",
      city: "Curitiba",
      state: "PR",
      email: "seupetfeliz@email.com",
      password: "123456",
      phone: "11999999999",
    };

    await createOrgUseCase.execute(createOrg);

    const authenticateUseCase = new AuthenticateUseCase(orgsRepository);
    const { org } = await authenticateUseCase.execute({
      email: "seupetfeliz@email.com",
      password: "123456",
    });

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(
      petsRepository,
      orgsRepository
    );

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

    await expect(
      async () =>
        await fetchPetsUseCase.execute({
          city: "",
          age: "Adulto",
        })
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
