import {Router, type RequestHandler} from 'express';
import validate from '../../middlewares/validate.middleware.js';
import {createVote} from '../../controllers/admin/vote.controller.js';
import {createVoteSchema} from '../../schemas/create-vote.schema.js';

const router = Router();

router.get('', (req, res) => {
  res.json({path: '/vote'});
});

router.post('/', validate(createVoteSchema), createVote as RequestHandler);

export default router;
