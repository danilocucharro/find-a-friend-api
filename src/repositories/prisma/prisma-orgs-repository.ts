import type { OrgsRepository } from "../orgs-repository.js";
import { prisma } from "src/lib/prisma.js";
import { Prisma } from "@prisma/client";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const org = await prisma.organization.create({ data });

    return org;
  }
}
