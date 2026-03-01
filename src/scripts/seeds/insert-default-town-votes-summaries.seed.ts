import {connectMongoDB, disconnectMongoDB} from '../../database/mongo.js';
import {TownVotesSummary} from '../../models/town-votes-summary.model.js';
import fs from 'fs';
import path from 'path';

async function handle(): Promise<void> {
  const filePath = path.join(process.cwd(), 'src/data/2022-mayor-default-town-votes-summaries.json');

  const townVotesSummaries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await TownVotesSummary.insertMany(townVotesSummaries);
}

try {
  await connectMongoDB();

  await handle();
} catch (error) {
  console.error(error);

  process.exit(1);
} finally {
  await disconnectMongoDB();
}