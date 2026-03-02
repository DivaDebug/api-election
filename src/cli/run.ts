import {connectMongoDB, disconnectMongoDB} from '../database/mongo.js';

const runJob = async (job: () => Promise<void>): Promise<void> => {
  try {
    await connectMongoDB();

    await job();

    console.log('✅ Job finished');
  } catch (error) {
    console.error('❌ Job failed:', error);

    process.exitCode = 1;
  } finally {
    await disconnectMongoDB();
  }
};

export default runJob;
