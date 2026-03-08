import runJob from '../run.js';

const handle = async (): Promise<void> => {
  await import('./insert-electoral-districts.seed.js');
  await import('./insert-default-county-votes-summaries.seed.js');
  await import('./insert-default-town-votes-summaries.seed.js');
};

await runJob(handle);
