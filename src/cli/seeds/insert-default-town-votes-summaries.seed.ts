import {TownVotesSummary} from '../../models/town-votes-summary.model.js';
import fs from 'fs';
import path from 'path';
import runJob from '../run.js';

const handle = async (): Promise<void> => {
  const filePath = path.join(process.cwd(), 'src/data/2022-mayor-default-town-votes-summaries.json');

  const townVotesSummaries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await TownVotesSummary.insertMany(townVotesSummaries);
};

await runJob(handle);
