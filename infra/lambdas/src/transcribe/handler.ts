import { Logger } from '@aws-lambda-powertools/logger';
import { MediaFormat, Transcribe } from '@aws-sdk/client-transcribe';
import { S3Event } from 'aws-lambda';
import { v7 as uuid } from 'uuid';

const logger = new Logger({ serviceName: 'transcribe' });

export const handler = async (event: S3Event): Promise<void> => {
  try {
    const jobId = uuid();
    logger.info('Received event', { event });
    const transcribe = new Transcribe();
    const format = event.Records[0].s3.object.key.split('.').pop();
    if (!format) {
      throw new Error('Invalid file format');
    }

    await transcribe.startTranscriptionJob({
      IdentifyMultipleLanguages: true,
      LanguageOptions: ['en-US', 'pt-PT'],
      Media: {
        MediaFileUri: `s3://${event.Records[0].s3.bucket.name}/${event.Records[0].s3.object.key}`,
      },
      MediaFormat: format as MediaFormat,
      TranscriptionJobName: `${jobId}`,
      OutputBucketName: event.Records[0].s3.bucket.name,
      OutputKey: `output/${jobId}/`,
      Settings: {
        ShowSpeakerLabels: true,
        MaxSpeakerLabels: 10,
      },
    });
  } catch (error) {
    logger.error('Error processing event', { error });
  }
};
