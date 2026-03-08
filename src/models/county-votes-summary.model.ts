import {Schema, model} from 'mongoose';

interface ICountyVotesSummary {
  year: number;
  type: 'mayor';
  countyName: string;
  countyCode: string;
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

const CountyVotesSummarySchema = new Schema<ICountyVotesSummary>(
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
    countyName: {
      type: String,
      required: true,
    },
    countyCode: {
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
    collection: 'county_votes_summaries',
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
);

CountyVotesSummarySchema.index(
  {
    year: 1,
    type: 1,
    countyCode: 1,
  },
  {
    unique: true,
  },
);

const CountyVotesSummary = model<ICountyVotesSummary>('CountyVotesSummary', CountyVotesSummarySchema);

export {
  ICountyVotesSummary,
  CountyVotesSummary,
};
