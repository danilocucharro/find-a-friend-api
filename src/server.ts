import { app } from "./app.js";
import { env } from "./env/index.js";

await app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("🟢 HTTP Server is running!"));
