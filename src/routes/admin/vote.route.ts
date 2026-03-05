import {Router} from 'express';
import {createVote} from '../../controllers/admin/vote.controller.js';

const router = Router();

router.get('', (req, res) => {
  res.json({path: '/vote'});
});

router.post('/', createVote);

export default router;
