/*
  Warnings:

  - You are about to drop the column `Membership_package` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "Membership_package",
ADD COLUMN     "membership_package" "public"."Package" NOT NULL DEFAULT 'A';
