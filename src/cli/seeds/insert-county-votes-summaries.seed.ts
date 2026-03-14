import {CountyVotesSummary} from '../../models/county-votes-summary.model.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import runJob from '../run.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

const handle = async (): Promise<void> => {
  const filePath = path.join(dataDir, '2022-mayor-county-votes-summaries.json');

  const countyVotesSummaries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await CountyVotesSummary.insertMany(countyVotesSummaries);
};

await runJob(handle);
