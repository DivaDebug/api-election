import {RequestHandler, Router} from 'express';
import validate from '../middlewares/validate.middleware.js';
import {countyVotesSummaryController} from '../controllers/county-votes-summary.controller.js';
import {GetCountyVotesSummariesSchema} from '../schemas/get-county-votes-summaries.schema.js';
import {GetCountyVotesSummarySchema} from '../schemas/get-county-votes-summary.schema.js';

const router = Router();

router.get(
  '/:countyVotesSummaryId',
  validate(GetCountyVotesSummarySchema),
  countyVotesSummaryController.getCountyVotesSummary as RequestHandler,
);

router.get(
  '/',
  validate(GetCountyVotesSummariesSchema),
  countyVotesSummaryController.getCountyVotesSummaries as RequestHandler,
);

export default router;
