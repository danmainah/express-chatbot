import {Router } from 'express';
import { chat, saveIdea, resetIdeas, resetChat} from '../controllers/chatController';

const router = Router();

router.post('/chat', chat);
router.post('/save-idea', saveIdea);
router.post('/reset-ideas', resetIdeas);
router.post('/reset-chat', resetChat);

export default router;