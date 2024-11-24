import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getTranscription, getTranscriptions, updateTranscription } from '../controllers/transcription.controller';

const router = Router();

router.get('/', authenticateJWT, getTranscriptions);
router.get('/:id', authenticateJWT, getTranscription);
router.post('/:id', authenticateJWT, updateTranscription);

export default router;
