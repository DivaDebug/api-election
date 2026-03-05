import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {voteService} from '../../services/vote.service.js';
import {votesSummaryService} from '../../services/votes-summary.service.js';

const createVote = async (req: Request, res: Response) => {
  const params = req.body;
  const {year, type, townCode} = params.electoralDistrict;

  try {
    await mongoose.connection.transaction(async () => {
      const vote = await voteService.createVote(params);

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
