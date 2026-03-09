import z from 'zod';

const GetTownVotesSummariesSchema = z.object({
  query: z.object({
    year: z.coerce.number(),
    type: z.enum(['mayor']),
    countyCode: z.string().optional(),
    candidateLimit: z.coerce.number().optional(),
  }),
});

type GetTownVotesSummariesRequest = z.infer<typeof GetTownVotesSummariesSchema>;

export {
  GetTownVotesSummariesSchema,
  GetTownVotesSummariesRequest,
};
