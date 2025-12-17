import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prisma } from "src/lib/prisma.js";
import type { Prisma, Pet } from "@prisma/client";

describe("Fetch Pets (e2e)", () => {
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

  it("should be able to list many pets", async () => {
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
    await request(app.server)
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

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        about: "Pedro é um vira lata muoto astuto e doido",
        age: "Maduro",
        energy_level: "Muita Energia",
        environment: "Ambiente amplo",
        independency: "Alta",
        name: "Pedro",
        size: "Pequenino",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        about: "Julia é um vira lata muoto astuto e doido",
        age: "Filhote",
        energy_level: "Muita Energia",
        environment: "Ambiente amplo",
        independency: "Pouca",
        name: "Julia",
        size: "Médio",
      });

    const response = await request(app.server)
      .get("/pets/search")
      .set("Authorization", `Bearer ${userToken}`)
      .query({
        city: "Curitiba",
        size: "Pequenino",
        age: "",
        energy_level: "",
        environment: "",
        independency: "",
      });

    const names = response.body.pets.map((pet: Pet) => pet.name);

    // Verifica se o array de nomes contém exatamente estes (independente da ordem)
    expect(names).toEqual(expect.arrayContaining(["Pedro", "Diego"]));

    await prisma.organization.delete({
      where: {
        email: "seupetfelizteste2e@email.com",
      },
    });
  });
});
