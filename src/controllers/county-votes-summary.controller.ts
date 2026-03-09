import {Response} from 'express';
import {GetCountyVotesSummariesRequest} from '../schemas/get-county-votes-summaries.schema.js';
import ValidatedRequest from '../types/validated-request.type.js';
import {votesSummaryService} from '../services/votes-summary.service.js';
import {GetCountyVotesSummaryRequest} from '../schemas/get-county-votes-summary.schema.js';
import {countyVotesSummaryRepository} from '../repositories/county-votes-summary.repository.js';

const getCountyVotesSummary = async (
  req: ValidatedRequest<GetCountyVotesSummaryRequest>,
  res: Response,
) => {
  const countyVotesSummary = await countyVotesSummaryRepository.findById(req.validated.params.countyVotesSummaryId);

  res.success(countyVotesSummary);
};

const getCountyVotesSummaries = async (
  req: ValidatedRequest<GetCountyVotesSummariesRequest>,
  res: Response,
) => {
  const countyVotesSummaries = await votesSummaryService.getCountyVotesSummaries(req.validated.query);

  res.success(countyVotesSummaries);
};

export const countyVotesSummaryController = {
  getCountyVotesSummary,
  getCountyVotesSummaries,
};
