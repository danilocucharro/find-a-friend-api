import type { FastifyInstance } from "fastify";
import { createOrgController } from "./create-org.js";

export async function organizationsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
}
