import {HydratedDocument} from 'mongoose';
import {ITownVotesSummary, TownVotesSummary} from '../models/town-votes-summary.model.js';

const find = async (
  filter: Partial<ITownVotesSummary>,
): Promise<HydratedDocument<ITownVotesSummary>[]> => {
  return TownVotesSummary.find(filter);
};

const findOneByYearTypeAndTownCode = async ({year, type, townCode}: {
  year: number;
  type: string;
  townCode: string;
}): Promise<ITownVotesSummary | null> => {
  return TownVotesSummary.findOne({year, type, townCode});
};

const upsert = async (townVotesSummary: ITownVotesSummary) => {
  return TownVotesSummary.findOneAndUpdate(
    {
      year: townVotesSummary.year,
      type: townVotesSummary.type,
      townCode: townVotesSummary.townCode,
    },
    townVotesSummary,
    {
      upsert: true,
      returnDocument: 'after',
    },
  );
};

export const townVotesSummaryRepository = {
  find,
  findOneByYearTypeAndTownCode,
  upsert,
};
