import { Elysia, t } from 'elysia';
import AuthSession, { IAuthSession } from '../entities/authsession.schema';
import { jwt } from '@elysiajs/jwt';
import { GithubAuthProvider } from 'firebase/auth';
import { getAuth, signInWithCredential } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from './firebaseconfig';

export const authController = (app: Elysia) =>
  app.group('/auth', (app: Elysia) =>
    app

      // Using JWT
      .use(
        jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string,
        })
      )

      // Validating required properties using Guard schema
      .guard({
        body: t.Object({
            authprovider: t.String(),
            accesstoken: t.String()
        })
      }, (app: Elysia) => app
          // This route is protected by the Guard above
          .post('/signin', async (handler: Elysia.Handler) => {
            const newSess = new AuthSession({
              providerid: 'placeholder',
              uid: 'placeholder',
              emailverified: false,
              isanonymous: false,
            });

            // support is limited to github oauth for demo
            if (handler.body.authprovider != 'github') {
              handler.set.status = 501;
              return { message: 'Not implemented' };
            }
            // TODO choose a real decode
            const decoded = atob(handler.body.accesstoken);
            // Sign in with the credential from the user.
            const credential = GithubAuthProvider.credential(decoded);
            const firebaseApp = initializeApp(FIREBASE_CONFIG);
            const authentic = getAuth(firebaseApp);

            signInWithCredential(authentic, credential)
              .then((result: any) => {
                newSess.displayname = result.user.displayName;
                newSess.email = result.user.email;
                newSess.emailverified = result.user.emailVerified;
                newSess.isanonymous = result.user.isAnonymous;
                newSess.providerid = result.user.providerId;
                newSess.tenantid = result.user.tenantId;
                newSess.uid = result.user.uid;
                ////newSess.refreshtoken = result.user.refreshToken;
                ////newSess.phonenumber = result.user.phoneNumber;
                ////newSess.photourl = result.user.photourl;
              })
              .catch((error) => {
                handler.set.status = 407;
                return { message: 'Firebase sign in failed.' };
              });
            try {
              const savedSess = await newSess.save();

              // JWT payload is based off record id **TODO refactor?
              const sessJWT = await handler.jwt.sign({
                sessId: savedSess._id
              });

              // Returning to the client (via headers)
              handler.set.headers = {
                'X-Authorization': sessJWT,
              };
              handler.set.status = 201;
              return newSess;

            } catch (e: any) {
              // If unique mongoose constraint  is violated
              if (e.name === 'MongoServerError' && e.code === 11000) {
                handler.set.status = 422;
                return {
                  message: 'Resource already exists!',
                  status: 422,
                };
              }

              handler.set.status = 500;
              return {
                message: 'Unable to save entry to the database!',
                status: 500,
              };
            }
          }, {
            onError(handler: Elysia.Handler) {
              console.log(`wwwwwww  Handler - Status Code: ${handler.set.status}`);
            }
          })

      )

      // Guard does not affect the following routes
      //.get('/', async ({ set }: Elysia.Set) => {
      //})

  );
