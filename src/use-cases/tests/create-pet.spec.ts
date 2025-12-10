import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "../create-org.js";
import { CreatePetUseCase } from "../create-pet.js";
import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository.js";

beforeAll(() => {});

afterAll(() => {});

describe("Create Pet Use Case", () => {
  it("Should be able to create a pet", async () => {
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

    const { org } = await createOrgUseCase.execute(createOrg);

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(petsRepository);

    const createPet = {
      about: "Um cachorro vira-lata caramelo bem fofinho",
      age: "Filhote",
      energy_level: 5,
      environment: "Ambiente amplo",
      independency: "Baixo",
      name: "Jumanji",
      org_id: org.id,
      size: "Pequenino",
    };

    const { pet } = await createPetUseCase.execute(createPet);

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Jumanji",
        org_id: org.id,
      })
    );
  });
});
