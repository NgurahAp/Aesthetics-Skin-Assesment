-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('member', 'admin');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20),
    "password" VARCHAR(255),
    "full_name" VARCHAR(255),
    "role" "public"."Role" NOT NULL DEFAULT 'member',
    "session_key" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");
