import type { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet.js";
import { verifyJwt } from "src/http/middlewares/verify-jwt.js";
import { fetchPetsController } from "./fetch-pets.js";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/pets/search", { onRequest: [verifyJwt] }, fetchPetsController);
}
