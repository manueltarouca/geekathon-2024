import { Request, Response } from 'express';

import prisma from '../database/prisma';
import { INTERNAL_SERVER_ERROR } from '../utils/http/error.model';

export async function getTranscriptions(req: Request, res: Response) {
  try {
    const transcriptions = await prisma.transcription.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        speakers: true,
        tags: true,
        createdAt: true,
      },
    });

    // Group by day
    const groupedTranscriptions = transcriptions.reduce((acc, transcription) => {
      const date = transcription.createdAt.toISOString().split('T')[0]; // Format to "YYYY-MM-DD"

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(transcription);

      return acc;
    }, {} as Record<string, typeof transcriptions>);

    // Transform to a more structured format if needed
    const response = Object.keys(groupedTranscriptions).map((date) => ({
      date,
      items: groupedTranscriptions[date],
      count: groupedTranscriptions[date].length,
    }));

    res.status(200).json({ grouped: response });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
  }
}

export async function getTranscription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const transcription = await prisma.transcription.findFirst({
      where: { id: id },
    });
    res.status(200).json({ transcription });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
  }
}

export async function updateTranscription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const transcription = await prisma.transcription.update({
      where: { id: id },
      data: {
        tags: tags,
      },
    });
    return res.status(200).json({ transcription });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Transcription not found' });
    }
    return res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
  }
}
