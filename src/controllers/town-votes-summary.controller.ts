import {Response} from 'express';
import ValidatedRequest from '../types/validated-request.type.js';
import {GetTownVotesSummariesRequest} from '../schemas/get-town-votes-summaries.schema.js';
import {votesSummaryService} from '../services/votes-summary.service.js';

const getTownVotesSummaries = async (req: ValidatedRequest<GetTownVotesSummariesRequest>, res: Response) => {
  const townVotesSummaries = await votesSummaryService.getTownVotesSummaries(req.validated.query);

  res.success(townVotesSummaries);
};

export const townVotesSummaryController = {
  getTownVotesSummaries,
};
