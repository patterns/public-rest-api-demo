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
          .post('/github', async (handler: Elysia.Handler) => {
            const newSess = new AuthSession();
            newSess.authprovider = handler.body.authprovider;
            newSess.accesstoken = handler.body.accesstoken;
            // support is limited to github oauth for demo
            if (newSess.authprovider != 'github') {
              handler.set.status = 500;
              return { message: 'Not implemented' };
            }
            // Sign in with the credential from the user.
            const credential = GithubAuthProvider.credential(newSess.accesstoken);
            const firebaseApp = initializeApp(FIREBASE_CONFIG);
            const authentic = getAuth(firebaseApp);
            ////const result = await signInWithCredential(authentic, credential);
            signInWithCredential(authentic, credential)
              .then((result: any) => {
                console.log('Firebase sign in succeeded.');
              })
              .catch((error) => {
                handler.set.status = 500;
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
              return {
                message: 'Started sign-in session',
                status: 201,
              };
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
