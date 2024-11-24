import { Router } from 'express';
import { register, login, getUser } from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateJWT, getUser);

export default router;
