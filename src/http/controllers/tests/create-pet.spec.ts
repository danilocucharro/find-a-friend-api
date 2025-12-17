import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prisma } from "src/lib/prisma.js";

describe("Create Pet (e2e)", () => {
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

  it("should be able to create a pet", async () => {
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

    const userToken = authResponse.body.token;

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        about: "Theo é um vira lata muoto astuto e doido",
        age: "Maduro",
        energy_level: "Muita Energia",
        environment: "Ambiente amplo",
        independency: "Alta",
        name: "Pedro",
        size: "Médio",
      });

    expect(response.statusCode).toEqual(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        about: "Theo é um vira lata muoto astuto e doido",
        age: "Maduro",
        energy_level: "Muita Energia",
        environment: "Ambiente amplo",
        independency: "Alta",
        name: "Pedro",
        size: "Médio",
      })
    );

    await prisma.organization.delete({
      where: {
        email: "seupetfelizteste2e@email.com",
      },
    });
  });
});
