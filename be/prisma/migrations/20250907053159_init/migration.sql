/*
  Warnings:

  - Added the required column `author` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."articles" ADD COLUMN     "author" VARCHAR(200) NOT NULL,
ADD COLUMN     "category" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "public"."videos" ADD COLUMN     "author" VARCHAR(200) NOT NULL,
ADD COLUMN     "category" VARCHAR(100) NOT NULL,
ADD COLUMN     "thumbnail" VARCHAR(255);
