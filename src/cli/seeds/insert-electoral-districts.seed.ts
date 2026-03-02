import {ElectoralDistrict} from '../../models/electoral-district.model.js';
import fs from 'fs';
import path from 'path';
import runJob from '../run.js';

const handle = async (): Promise<void> => {
  const filePath = path.join(process.cwd(), 'src/data/2022-mayor-electoral-district-candidates.json');

  const electoralDistrictCandidates = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await ElectoralDistrict.insertMany(electoralDistrictCandidates);
};

await runJob(handle);
