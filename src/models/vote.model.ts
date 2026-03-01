import {Schema, model} from 'mongoose';
import {IElectoralDistrict} from './electoral-district.model.js';

interface IVote {
  electoralDistrict: {
    year: number;
    type: 'mayor';
    countyName: string;
    countyCode: string;
    townName: string;
    townCode: string;
    candidate: {
      no: number;
      name: string;
      party: string;
    };
  };
  votes: number;
}

interface IVoteSummary {
  electoralDistrict: IElectoralDistrict;
  totalVotes: number;
}

const VoteSchema = new Schema<IVote>(
  {
    electoralDistrict: {
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
      townName: {
        type: String,
        required: true,
      },
      townCode: {
        type: String,
        required: true,
      },
      candidate: {
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
      },
    },
    votes: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'votes',
    timestamps: true,
  },
);

VoteSchema.index(
  {
    'electoralDistrict.year': 1,
    'electoralDistrict.type': 1,
    'electoralDistrict.countyCode': 1,
    'electoralDistrict.candidate.no': 1,
  },
);

VoteSchema.index(
  {
    'electoralDistrict.year': 1,
    'electoralDistrict.type': 1,
    'electoralDistrict.townCode': 1,
    'electoralDistrict.candidate.no': 1,
  },
);

const Vote = model<IVote>('Vote', VoteSchema);

export {
  IVote,
  IVoteSummary,
  Vote,
};
