import {connectMongoDB, disconnectMongoDB} from '../../database/mongo.js';
import {ElectoralDistrict} from '../../models/electoral-district.model.js';
import fs from 'fs';
import path from 'path';

async function handle(): Promise<void> {
  const filePath = path.join(process.cwd(), 'src/data/2022-mayor-electoral-district-candidates.json');

  const electoralDistrictCandidates = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await ElectoralDistrict.insertMany(electoralDistrictCandidates);
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
