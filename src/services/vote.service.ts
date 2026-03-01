import {IVote} from '../models/vote.model.js';
import {ElectoralDistrict, IElectoralDistrict} from '../models/electoral-district.model.js';
import {electoralDistrictRepository} from '../repositories/electoral-district.repository.js';
import {voteRepository} from '../repositories/vote.repository.js';
import {HttpResourceNotFoundException} from '../exceptions/http-resource-not-found.exception.js';

const createVote = async (params: Partial<IVote>): Promise<IVote> => {
  const electoralDistrict: IElectoralDistrict | null = await electoralDistrictRepository.findByTownCodeAndCandidateNo({
    year: params.electoralDistrict?.year!,
    type: params.electoralDistrict?.type!,
    townCode: params.electoralDistrict?.townCode!,
    candidateNo: params.electoralDistrict?.candidate?.no!,
  });

  if (!electoralDistrict) {
    throw new HttpResourceNotFoundException(ElectoralDistrict);
  }

  const vote: IVote = {
    electoralDistrict,
    votes: params.votes!,
  };

  return voteRepository.create(vote);
};

export const voteService = {
  createVote,
};
