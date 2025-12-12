import type { Organization, Pet, Prisma } from "@prisma/client";
import type { OrgsRepository } from "../orgs-repository.js";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput) {
    const org = {
      id: randomUUID(),
      address: data.address,
      city: data.city,
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phone,
      state: data.state,
    };

    this.orgs.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email);

    if (!org) return null;

    return org;
  }
}
