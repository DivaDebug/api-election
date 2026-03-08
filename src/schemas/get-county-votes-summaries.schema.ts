import z from 'zod';

const GetCountyVotesSummariesSchema = z.object({
  query: z.object({
    year: z.coerce.number(),
    type: z.enum(['mayor']),
    candidateLimit: z.coerce.number().optional(),
  }),
});

type GetCountyVotesSummariesRequest = z.infer<typeof GetCountyVotesSummariesSchema>;

export {
  GetCountyVotesSummariesSchema,
  GetCountyVotesSummariesRequest,
};
