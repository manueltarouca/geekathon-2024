export interface Transcription {
  id: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
  speakers: number;
  title: string;
  summary: string;
  tags: string[];
  transcription: string;
}
