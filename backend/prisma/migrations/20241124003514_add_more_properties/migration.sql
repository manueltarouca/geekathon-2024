/*
  Warnings:

  - Added the required column `summary` to the `transcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `transcriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transcriptions" ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;
