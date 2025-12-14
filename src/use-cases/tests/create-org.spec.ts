import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "../create-org.js";

describe("Create Org Use Case", () => {
  it("Should be able to create an organization", async () => {
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

    expect(org).toEqual(
      expect.objectContaining({
        name: "Seu pet feliz",
      })
    );
  });
});
