import {RequestHandler, Router} from 'express';
import {townVotesSummaryController} from '../controllers/town-votes-summary.controller.js';
import validate from '../middlewares/validate.middleware.js';
import {GetTownVotesSummariesSchema} from '../schemas/get-town-votes-summaries.schema.js';

const router = Router();

router.get('/', validate(GetTownVotesSummariesSchema), townVotesSummaryController.getTownVotesSummaries);

export default router;
