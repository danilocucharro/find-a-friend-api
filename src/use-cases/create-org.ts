import type { Organization } from "@prisma/client";
import type { OrgsRepository } from "src/repositories/orgs-repository.js";

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
    const org = await this.orgsRepository.create({
      address,
      city,
      email,
      name,
      password,
      phone,
      state,
    });

    return { org };
  }
}
