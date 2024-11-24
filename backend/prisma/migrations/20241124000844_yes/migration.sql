/*
  Warnings:

  - You are about to drop the `Transcription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Transcription";

-- CreateTable
CREATE TABLE "transcriptions" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "num_speakers" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transcriptions_pkey" PRIMARY KEY ("id")
);
