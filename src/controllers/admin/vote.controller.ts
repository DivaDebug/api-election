import {Response} from 'express';
import mongoose from 'mongoose';
import ValidatedRequest from '../../types/validated-request.type.js';
import {CreateVoteRequest} from '../../schemas/create-vote.schema.js';
import {voteService} from '../../services/vote.service.js';
import {votesSummaryService} from '../../services/votes-summary.service.js';
import CreateVoteDto from '../../dto/create-vote.dto.js';

const createVote = async (
  req: ValidatedRequest<CreateVoteRequest>,
  res: Response,
) => {
  const createVoteDto: CreateVoteDto = req.validated.body;
  const {year, type, townCode} = createVoteDto.electoralDistrict;

  try {
    await mongoose.connection.transaction(async () => {
      const vote = await voteService.createVote(createVoteDto);

      const countyCode = vote.electoralDistrict.countyCode;

      await votesSummaryService.recalculateTownVotesSummary({year, type, townCode});
      await votesSummaryService.recalculateCountyVotesSummary({year, type, countyCode});
    });
  } catch (error) {
    throw error;
  }

  res.success();
};

export {
  createVote,
};
