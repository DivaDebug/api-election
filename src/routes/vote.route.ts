import {Router, Request, Response} from 'express';
import {createVote} from '../controllers/vote.controller.js';

const router = Router();

router.get('', (req, res) => {
  res.json({path: '/vote'});
});

router.post('/', async (req: Request, res: Response) => {
  await createVote(req, res);
});

export default router;
