import {ITownVotesSummary, TownVotesSummary} from '../models/town-votes-summary.model.js';

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
  findOneByYearTypeAndTownCode,
  upsert,
};
