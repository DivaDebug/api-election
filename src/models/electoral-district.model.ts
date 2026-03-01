import {Schema, model} from 'mongoose';

interface IElectoralDistrict {
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
}

const ElectoralDistrictSchema = new Schema<IElectoralDistrict>(
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
  {
    collection: 'electoral_districts',
    timestamps: true,
  },
);

ElectoralDistrictSchema.index(
  {
    year: 1,
    type: 1,
    countyCode: 1,
    townCode: 1,
    'candidate.no': 1,
  },
  {
    unique: true,
  },
);

const ElectoralDistrict = model<IElectoralDistrict>('ElectoralDistrict', ElectoralDistrictSchema);

export {
  IElectoralDistrict,
  ElectoralDistrict,
};
