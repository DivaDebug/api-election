import {Response} from 'express';
import {GetCountyVotesSummariesRequest} from '../schemas/get-county-votes-summaries.schema.js';
import ValidatedRequest from '../types/validated-request.type.js';
import {votesSummaryService} from '../services/votes-summary.service.js';

const getCountyVotesSummaries = async (
  req: ValidatedRequest<GetCountyVotesSummariesRequest>,
  res: Response,
) => {
  const countyVotesSummaries = await votesSummaryService.getCountyVotesSummaries(req.validated.query);

  res.success(countyVotesSummaries);
};

export const countyVotesSummaryController = {
  getCountyVotesSummaries,
};
