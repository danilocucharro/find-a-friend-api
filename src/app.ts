import Fastify from "fastify";
import { organizationsRoutes } from "./http/controllers/organizations/routes.js";

export const app = Fastify();

organizationsRoutes(app);
