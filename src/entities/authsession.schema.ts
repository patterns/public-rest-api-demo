import { Document, Schema, model } from 'mongoose';

export interface IAuthSession extends Document {
  displayname?: string;
  email?: string;
  emailverified: boolean;
  isanonymous: boolean;
  phonenumber?: string;
  photourl?: string;
  providerid: string;
  refreshtoken?: string;
  tenantid?: string;
  uid: string;
}

function ignoreEmpty (a: string | null) {
  let clean = a?.trim();

  if (clean === '' || a == null) {
    return undefined;
  }

  return clean;
}

const schema = new Schema<IAuthSession>(
  {
    displayname: { type: String, set: v => ignoreEmpty(v) },
    email: { type: String, set: v => ignoreEmpty(v) },
    emailverified: { type: Boolean },
    isanonymous: { type: Boolean },
    phonenumber: { type: String, set: v => ignoreEmpty(v) },
    photourl: { type: String, set: v => ignoreEmpty(v) },
    providerid: { type: String, required: true },
    refreshtoken: { type: String, set: v => ignoreEmpty(v), select: false },
    tenantid: { type: String, set: v => ignoreEmpty(v) },
    uid: { type: String, required: true, unique: true },

  },
  {
    timestamps: true,
    strict: 'throw',
  }
);

export default model<IAuthSession>('authsession', schema);
