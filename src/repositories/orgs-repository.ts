import type { Organization, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
