import type { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet.js";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", createPetController);
}
