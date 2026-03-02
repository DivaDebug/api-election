import {CountyVotesSummary} from '../../models/county-votes-summary.model.js';
import fs from 'fs';
import path from 'path';
import runJob from '../run.js';

const handle = async (): Promise<void> => {
  const filePath = path.join(process.cwd(), 'src/data/2022-mayor-default-county-votes-summaries.json');

  const countyVotesSummaries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await CountyVotesSummary.insertMany(countyVotesSummaries);
};

await runJob(handle);
