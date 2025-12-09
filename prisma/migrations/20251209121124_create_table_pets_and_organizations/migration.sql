-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PEQUENINO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('FILHOTE', 'JUVENIL', 'ADULTO', 'MADURO');

-- CreateEnum
CREATE TYPE "Independency" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "energy_level" INTEGER NOT NULL,
    "size" "Size" NOT NULL,
    "age" "Age" NOT NULL,
    "independency" "Independency" NOT NULL,
    "environment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
