import { Document, Schema, model } from 'mongoose';

export interface IAuthSession extends Document {
  displayname: string;
  email: string;
  emailverified: boolean;
  isanonymous: boolean;
  phonenumber: string;
  photourl: string;
  providerid: string;
  refreshtoken: string;
  tenantid: string;
  uid: string;
}

const schema = new Schema<IAuthSession>(
  {
    displayname: {
      type: String,
    },
    email: {
      type: String,
    },
    emailverified: {
      type: Boolean,
      required: true,
    },
    isanonymous: {
      type: Boolean,
    },
    phonenumber: {
      type: String,
    },
    photourl: {
      type: String,
    },
    providerid: {
      type: String,
      required: true,
    },
    refreshtoken: {
      type: String,
      select: false,
    },
    tenantid: {
      type: String,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAuthSession>('authsession', schema);
