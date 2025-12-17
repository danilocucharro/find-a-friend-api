import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prisma } from "src/lib/prisma.js";

describe("Authenticate ()e2e)", () => {
  let app: any;

  // arquivo de teste
  beforeAll(async () => {
    // Limpa o cache para garantir que o prisma.ts seja lido de novo
    vi.resetModules();

    const { app: fastifyApp } = await import("src/app.js");
    app = fastifyApp;
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
      name: "Seu pet feliz",
      address: "Rua das pedras 23",
      city: "Curitiba",
      state: "PR",
      email: "seupetfelizteste2e@email.com",
      password: "123456",
      phone: "11999999999",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "seupetfelizteste2e@email.com",
      password: "123456",
    });

    expect(authResponse.statusCode).toEqual(200);

    expect(authResponse.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    await prisma.organization.delete({
      where: {
        email: "seupetfelizteste2e@email.com",
      },
    });
  });
});
