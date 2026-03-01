import {ICountyVotesSummary, CountyVotesSummary} from '../models/county-votes-summary.model.js';

const findOneByYearTypeAndCountyCode = async ({year, type, countyCode}: {
  year: number;
  type: string;
  countyCode: string;
}): Promise<ICountyVotesSummary | null> => {
  return CountyVotesSummary.findOne({year, type, countyCode});
};

const upsert = async (countyVotesSummary: ICountyVotesSummary) => {
  return CountyVotesSummary.findOneAndUpdate(
    {
      year: countyVotesSummary.year,
      type: countyVotesSummary.type,
      countyCode: countyVotesSummary.countyCode,
    },
    countyVotesSummary,
    {
      upsert: true,
      returnDocument: 'after',
    },
  );
};

export const countyVotesSummaryRepository = {
  findOneByYearTypeAndCountyCode,
  upsert,
};
