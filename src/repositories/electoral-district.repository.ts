import {ElectoralDistrict, IElectoralDistrict} from '../models/electoral-district.model.js';

const findByTownCode = async (townCode: string): Promise<IElectoralDistrict | null> => {
  return ElectoralDistrict.findOne({townCode});
};

const findByTownCodeAndCandidateNo = async ({year, type, townCode, candidateNo}: {
  year: number;
  type: string;
  townCode: string;
  candidateNo: number;
}): Promise<IElectoralDistrict | null> => {
  return ElectoralDistrict.findOne({
    year,
    type,
    townCode,
    'candidate.no': candidateNo,
  });
};

export const electoralDistrictRepository = {
  findByTownCode,
  findByTownCodeAndCandidateNo,
};
