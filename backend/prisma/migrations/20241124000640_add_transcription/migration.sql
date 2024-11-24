-- CreateTable
CREATE TABLE "Transcription" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "num_speakers" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);
