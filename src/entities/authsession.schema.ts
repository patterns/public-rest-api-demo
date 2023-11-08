import { Document, Schema, model } from 'mongoose';

export interface IAuthSession extends Document {
  authprovider: string;
  accesstoken: string;
}

const schema = new Schema<IAuthSession>(
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

export default model<IAuthSession>('authsession', schema);
