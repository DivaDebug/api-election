import {IVoteSummary} from '../models/vote.model.js';
import {ICountyVotesSummary, CountyVotesSummary} from '../models/county-votes-summary.model.js';
import {ITownVotesSummary, TownVotesSummary} from '../models/town-votes-summary.model.js';
import {voteRepository} from '../repositories/vote.repository.js';
import {countyVotesSummaryRepository} from '../repositories/county-votes-summary.repository.js';
import {townVotesSummaryRepository} from '../repositories/town-votes-summary.repository.js';
import {HttpResourceNotFoundException} from '../exceptions/http-resource-not-found.exception.js';


const recalculateCountyVotesSummary = async ({year, type, countyCode}: {
  year: number;
  type: string;
  countyCode: string;
}): Promise<void> => {
  return recalculateSummary({year, type, countyCode});
};

const recalculateTownVotesSummary = async ({year, type, townCode}: {
  year: number;
  type: string;
  townCode: string;
}): Promise<void> => {
  return recalculateSummary({year, type, townCode});
};

const recalculateSummary = async ({year, type, countyCode, townCode}: {
  year: number;
  type: string;
  countyCode?: string;
  townCode?: string;
}): Promise<void> => {
  let voteSummaries: IVoteSummary[] = [];

  if (countyCode !== undefined) {
    voteSummaries = await voteRepository.groupCandidateAndSumVotes({year, type, countyCode});
  } else if (townCode !== undefined) {
    voteSummaries = await voteRepository.groupCandidateAndSumVotes({year, type, townCode});
  }

  if (voteSummaries.length === 0) {
    return;
  }

  let votesSummary: ICountyVotesSummary | ITownVotesSummary | null = null;

  if (countyCode !== undefined) {
    votesSummary = await countyVotesSummaryRepository.findOneByYearTypeAndCountyCode({
      year,
      type,
      countyCode,
    });
  } else if (townCode !== undefined) {
    votesSummary = await townVotesSummaryRepository.findOneByYearTypeAndTownCode({
      year,
      type,
      townCode,
    });
  }

  if (!votesSummary) {
    throw new HttpResourceNotFoundException(typeof votesSummary);
  }

  const totalCandidateVotes = voteSummaries.reduce((sum: number, voteSummary: IVoteSummary) => {
    return sum + voteSummary.totalVotes;
  }, 0);

  const newCandidatesMap = new Map(voteSummaries.map((voteSummary: IVoteSummary) => {
    return [
      voteSummary.electoralDistrict.candidate.no,
      {
        ...voteSummary.electoralDistrict.candidate,
        votes: voteSummary.totalVotes,
        voteShare: voteSummary.totalVotes / totalCandidateVotes,
      },
    ];
  }));

  votesSummary.candidates = votesSummary.candidates
    .map((candidate) => {
      return newCandidatesMap.get(candidate.no) ?? candidate;
    })
    .sort((a, b) => (b.votes - a.votes) || (a.no - b.no));

  if (votesSummary instanceof CountyVotesSummary) {
    await countyVotesSummaryRepository.upsert(votesSummary);
  } else if (votesSummary instanceof TownVotesSummary) {
    await townVotesSummaryRepository.upsert(votesSummary);
  }
};

export const votesSummaryService = {
  recalculateCountyVotesSummary,
  recalculateTownVotesSummary,
};
