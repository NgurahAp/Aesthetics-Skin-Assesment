/*
  Warnings:

  - A unique constraint covering the columns `[facebook_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "facebook_id" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "users_facebook_id_key" ON "public"."users"("facebook_id");
