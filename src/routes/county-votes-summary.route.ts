import {RequestHandler, Router} from 'express';
import {countyVotesSummaryController} from '../controllers/county-votes-summary.controller.js';
import {GetCountyVotesSummariesSchema} from '../schemas/get-county-votes-summaries.schema.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

router.get(
  '/',
  validate(GetCountyVotesSummariesSchema),
  countyVotesSummaryController.getCountyVotesSummaries as RequestHandler,
);

export default router;
