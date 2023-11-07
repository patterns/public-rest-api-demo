import { Elysia, t } from 'elysia';
import Session, { ISession } from '../entities/session.schema';
import { GithubAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { jwt } from '@elysiajs/jwt';

export const firebaseauthController = (app: Elysia) =>
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
            try {
              if (handler.body.authprovider !== 'github') {
                // only support github auth for now
                handler.set.status = 500;
                return {
                  message: 'Unsupported auth',
                  status: 500,
                };
              }

              const credential = GithubAuthProvider.credential(handler.body.accesstoken);
              // sign-in with the credential from the user
              const auth = getAuth();
              signInWithCredential(auth, credential)
                .then((result) => {
                // start session record
              const newSession = new Session();
              newSession.authprovider = handler.body.authprovider;
              newSession.accesstoken = handler.body.accesstoken;

              const savedSession = await newSession.save();

              // JWT payload is based off id (TODO refactor)
              const sessToken = await handler.jwt.sign({
                sessionId: savedSession._id
              });

              // Returning JTW to the client (via headers)
              handler.set.headers = {
                'X-Authorization': sessToken,
              };
              handler.set.status = 201;
              return {
                message: 'Sign-in session created',
              };

                })
                .catch((error) => {
                  handler.set.status = 500;
                  return {
                    message: error.message,
                    status: 500,
                  };
                });

            } catch (e: any) {
              // If unique mongoose constraint (for id) is violated
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

      .get('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const existingSession = await Session.findById(id);

          if (!existingSession) {
            handler.set.status = 404;
            return {
              message: 'Requested resource was not found!',
              status: 404,
            };
          }

          return existingSession;
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to retrieve the resource!',
            status: 500,
          };
        }
      })


  );
