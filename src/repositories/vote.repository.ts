import {IVote, IVoteSummary, Vote} from '../models/vote.model.js';

const create = async (vote: IVote): Promise<IVote> => {
  return await Vote.create(vote);
};

const groupCandidateAndSumVotes = async ({year, type, townCode, countyCode}: {
  year: number;
  type: string;
  townCode?: string;
  countyCode?: string;
}): Promise<IVoteSummary[]> => {
  const matchFilter: Record<string, unknown> = {
    'electoralDistrict.year': year,
    'electoralDistrict.type': type,
  };

  if (townCode) {
    matchFilter['electoralDistrict.townCode'] = townCode;
  }

  if (countyCode) {
    matchFilter['electoralDistrict.countyCode'] = countyCode;
  }

  return Vote.aggregate<IVoteSummary>([
    {
      $match: matchFilter,
    },
    {
      $group: {
        _id: '$electoralDistrict.candidate.no',
        totalVotes: {$sum: '$votes'},
        electoralDistrict: {$first: '$electoralDistrict'},
      },
    },
    {
      $set: {
        'electoralDistrict.candidate.no': '$_id',
      },
    },
    {
      $project: {
        _id: 0,
        electoralDistrict: 1,
        totalVotes: 1,
      },
    },
    {
      $sort: {totalVotes: -1},
    },
  ]);
};

export const voteRepository = {
  create,
  groupCandidateAndSumVotes,
};
