import { describe, expect, it } from "vitest";
import { createOrgAndAuthenticate } from "../utils/tests/create-org-and-authenticate.js";
import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository.js";
import { CreatePetUseCase } from "../create-pet.js";
import { GetPetInfoUseCase } from "../get-pet-info.js";
import { ContentNotFoundError } from "../errors/content-not-found-error.js";
import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { AuthenticateUseCase } from "../authenticate.js";
import { CreateOrgUseCase } from "../create-org.js";

describe("Get Pet Info Use Case", () => {
  it("should be able to get a pet details", async () => {
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

    const createPet = {
      about: "Um cachorro vira-lata caramelo bem fofinho",
      age: "Filhote",
      energy_level: "Muita Energia",
      environment: "Ambiente amplo",
      independency: "Baixo",
      city: org.city,
      name: "Jumanji",
      org_id: org.id,
      size: "Pequenino",
    };

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(
      petsRepository,
      orgsRepository
    );

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

    const createPet = {
      about: "Um cachorro vira-lata caramelo bem fofinho",
      age: "Filhote",
      energy_level: "Muita Energia",
      environment: "Ambiente amplo",
      independency: "Baixo",
      city: org.city,
      name: "Jumanji",
      org_id: org.id,
      size: "Pequenino",
    };

    const petsRepository = new InMemoryPetsRepository();
    const createPetUseCase = new CreatePetUseCase(
      petsRepository,
      orgsRepository
    );

    const { pet } = await createPetUseCase.execute(createPet);

    const getPetInfoUseCase = new GetPetInfoUseCase(petsRepository);

    await getPetInfoUseCase.execute({ petId: pet.id });

    await expect(
      async () => await getPetInfoUseCase.execute({ petId: "mocked-id" })
    ).rejects.toBeInstanceOf(ContentNotFoundError);
  });
});
