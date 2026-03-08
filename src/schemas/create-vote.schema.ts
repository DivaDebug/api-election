import z from 'zod';

const createVoteSchema = z.object({
  body: z.object({
    electoralDistrict: z.object({
      year: z.number(),
      type: z.enum(['mayor']),
      townCode: z.string(),
      candidate: z.object({
        no: z.number(),
      }),
    }),
    votes: z.number(),
  }),
});

type CreateVoteRequest = z.infer<typeof createVoteSchema>;

export {
  createVoteSchema,
  CreateVoteRequest,
};
