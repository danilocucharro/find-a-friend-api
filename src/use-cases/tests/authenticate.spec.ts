import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate.js";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error.js";
import { CreateOrgUseCase } from "../create-org.js";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository);
    const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

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

    const { org } = await authenticateUseCase.execute({
      email: createOrg.email,
      password: createOrg.password,
    });

    expect(org).toEqual(
      expect.objectContaining({
        email: "seupetfeliz@email.com",
      })
    );
  });

  it("should not be able to authenticate", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

    const createOrg = {
      name: "Seu pet feliz",
      address: "Rua das pedras 23",
      city: "Curitiba",
      state: "PR",
      email: "seupetfeliz@email.com",
      password: "123456",
      phone: "11999999999",
    };

    await orgsRepository.create(createOrg);

    await expect(
      async () =>
        await authenticateUseCase.execute({
          email: createOrg.email,
          password: "12345",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
