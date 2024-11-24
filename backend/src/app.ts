import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import transcriptionsRoutes from './routes/transcription.routes';

const app = express();

app.use(express.json(), cors());

app.use('/api/auth', authRoutes);
app.use('/api/transcriptions', transcriptionsRoutes);
app.get('/api/health-check', (req, res) => res.status(200).send('OK'));

export default app;
