import {Router} from 'express';
import voteRoute from './vote.route.js';

const router = Router();

router.use('/votes', voteRoute);

export default router;
