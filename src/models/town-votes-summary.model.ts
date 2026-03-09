import {Schema, model} from 'mongoose';

interface ITownVotesSummary {
  year: number;
  type: 'mayor';
  countyCode: string;
  townName: string;
  townCode: string;
  candidates: {
    no: number;
    name: string;
    party: string;
    votes: number;
    voteShare: number;
  }[];
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TownVotesSummarySchema = new Schema<ITownVotesSummary>(
    {
      year: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['mayor'],
      },
      countyCode: {
        type: String,
        required: true,
      },
      townName: {
        type: String,
        required: true,
      },
      townCode: {
        type: String,
        required: true,
      },
      candidates: [
        {
          no: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          party: {
            type: String,
            required: true,
          },
          votes: {
            type: Number,
            required: true,
          },
          voteShare: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    {
      collection: 'town_votes_summaries',
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          delete ret.__v;
          delete ret.createdAt;
          delete ret.updatedAt;

          return ret;
        },
      },
    },
  )
;

TownVotesSummarySchema.index(
  {
    year: 1,
    type: 1,
    townCode: 1,
  },
  {
    unique: true,
  },
);

const TownVotesSummary = model<ITownVotesSummary>('TownVotesSummary', TownVotesSummarySchema);

export {
  ITownVotesSummary,
  TownVotesSummary,
};
