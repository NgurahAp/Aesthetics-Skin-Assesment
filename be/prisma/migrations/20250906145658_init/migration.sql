-- CreateEnum
CREATE TYPE "public"."Package" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('article', 'video');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "Membership_package" "public"."Package" NOT NULL DEFAULT 'A';

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."videos" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_content_access" (
    "id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "content_type" "public"."ContentType" NOT NULL,
    "content_id" VARCHAR(36) NOT NULL,
    "accessed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "article_id" VARCHAR(36),
    "video_id" VARCHAR(36),

    CONSTRAINT "user_content_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_content_access_user_id_content_type_content_id_key" ON "public"."user_content_access"("user_id", "content_type", "content_id");

-- AddForeignKey
ALTER TABLE "public"."user_content_access" ADD CONSTRAINT "user_content_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_content_access" ADD CONSTRAINT "user_content_access_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_content_access" ADD CONSTRAINT "user_content_access_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
