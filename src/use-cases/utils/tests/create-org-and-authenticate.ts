import { InMemoryOrgsRepository } from "src/repositories/in-memory/in-memory-orgs-repository.js";
import { AuthenticateUseCase } from "src/use-cases/authenticate.js";
import { CreateOrgUseCase } from "src/use-cases/create-org.js";

export async function createOrgAndAuthenticate() {
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

  return { org };
}
