import {Router, Request, Response} from 'express';
import adminRoute from './admin/admin.route.js';
import countyVotesSummaryRoute from './county-votes-summary.route.js';
import townVotesSummaryRoute from './town-votes-summary.route.js';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.success();
});

router.use('/admin', adminRoute);
router.use('/county-votes-summaries', countyVotesSummaryRoute);
router.use('/town-votes-summaries', townVotesSummaryRoute);

export default router;
