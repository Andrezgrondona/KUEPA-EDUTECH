import { Router } from 'express';
import { getMessages, addMessage } from '../controllers/chatController';

const router: Router = Router();

router.get('/:room', getMessages);
router.post('/', addMessage);

export default router;
