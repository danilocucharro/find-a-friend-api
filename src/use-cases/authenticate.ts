import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "src/use-cases/errors/InvalidCredentialsError.js";
import type { OrgsRepository } from "src/repositories/orgs-repository.js";

export class AuthenticateUseCase {
  private orgsRepository;

  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute(email: string, password: string) {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrect = await compare(password, org.password);

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
