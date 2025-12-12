import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error.js";
import type { OrgsRepository } from "src/repositories/orgs-repository.js";
import type { Organization } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Organization;
}

export class AuthenticateUseCase {
  private orgsRepository;

  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrect = await compare(password, org.password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
