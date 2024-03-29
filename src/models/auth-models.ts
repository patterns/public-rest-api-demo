import { Schema, model } from 'mongoose';


const sessionSchema = new Schema({

    sessionToken: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    expires: Date

}, { collection: 'sessions'});


const accountSchema = new Schema({

    provider: String,
    type: String,
    providerAccountId: String,
    accessToken: String,
    expires_at: Schema.Types.Number,
    refresh_token_expires_in: Schema.Types.Number,
    scope: String,
    token_type: String,
    id_token: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {collection: 'accounts'});


const verificationSchema = new Schema({

    identifier: String,
    token: String,
    expires: Date

}, {collection: 'verification_tokens'})


export const Session = model('Session', sessionSchema);
export const Account = model('Account', accountSchema);
export const VerificationToken = model('VerificationToken', verificationSchema);