import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate.js";
import { InvalidCredentialsError } from "src/use-cases/errors/InvalidCredentialsError.js";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
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

    const { org } = await authenticateUseCase.execute(
      createOrg.email,
      createOrg.password
    );

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

    expect(
      async () => await authenticateUseCase.execute(createOrg.email, "1234567")
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
