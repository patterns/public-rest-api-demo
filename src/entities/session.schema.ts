import { Document, Schema, model } from 'mongoose';

export interface ISession extends Document {
  authprovider: string;
  accesstoken: string;
}

const schema = new Schema<ISession>(
  {
    authprovider: {
      type: String,
      required: true,
    },
    accesstoken: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISession>('session', schema);
