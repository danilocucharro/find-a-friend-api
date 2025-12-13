import type { FastifyInstance } from "fastify";
import { createOrgController } from "./create-org.js";
import { authenticateController } from "./authenticate.js";

export async function organizationsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
  app.post("/sessions", authenticateController);
}
