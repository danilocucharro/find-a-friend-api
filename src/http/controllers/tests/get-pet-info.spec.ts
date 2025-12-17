import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prisma } from "src/lib/prisma.js";

describe("Get Pet Info (e2e)", () => {
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

  it("should be able to get a pet info", async () => {
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
    console.log("USER TOKEN => ", userToken);
    // Creating 4 different pets
    const createdPetResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        about: "Diego é um vira lata muoto astuto e doido",
        age: "Filhote",
        energy_level: "Muita Energia",
        environment: "Ambiente amplo",
        independency: "Pouca",
        name: "Diego",
        size: "Pequenino",
      });

    const petId = createdPetResponse.body.id;
    const response = await request(app.server)
      .get("/pets/")
      .set("Authorization", `Bearer ${userToken}`)
      .query({ id: petId });

    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: petId,
      })
    );

    await prisma.organization.delete({
      where: {
        email: "seupetfelizteste2e@email.com",
      },
    });
  });
});
