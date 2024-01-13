import { Document, Schema, model } from 'mongoose';

export interface ICordyceps extends Document {
  nickname: string;
  species: string;
}

const schema = new Schema<ICordyceps>(
  {
    species: {
      type: String,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ICordyceps>('cordyceps', schema);
