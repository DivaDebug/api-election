import z from 'zod';

const GetCountyVotesSummarySchema = z.object({
  params: z.object({
    countyVotesSummaryId: z.string(),
  }),
});

type GetCountyVotesSummaryRequest = z.infer<typeof GetCountyVotesSummarySchema>;

export {
  GetCountyVotesSummarySchema,
  GetCountyVotesSummaryRequest,
};
