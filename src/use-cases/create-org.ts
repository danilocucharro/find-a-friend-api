import type { Organization } from "@prisma/client";
import { hash } from "bcryptjs";
import type { OrgsRepository } from "src/repositories/orgs-repository.js";
import { UserAlreadyExistsError } from "./errors/org-already-exists-error.js";

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  state: string;
  city: string;
}

interface CreateOrgUseCaseResponse {
  org: Organization;
}

export class CreateOrgUseCase {
  private orgsRepository: OrgsRepository;
  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute({
    address,
    city,
    email,
    name,
    password,
    phone,
    state,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const doesUserAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (doesUserAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const password_hashed = await hash(password, 6);

    const org = await this.orgsRepository.create({
      address,
      city,
      email,
      name,
      password: password_hashed,
      phone,
      state,
    });

    return { org };
  }
}
