import { Elysia, t } from 'elysia';
import Cordyceps, { ICordyceps } from '../entities/cordyceps.schema';
import { jwt } from '@elysiajs/jwt';

export const cordycepsController = (app: Elysia) =>
  app.group('/cordyceps', (app: Elysia) =>
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
            nickname: t.String(),
            species: t.String()
        })
      }, (app: Elysia) => app
          // This route is protected by the Guard above
          .post('/', async (handler: Elysia.Handler) => {
            try {

              const newCordyceps = new Cordyceps();
              newCordyceps.nickname = handler.body.nickname;
              newCordyceps.species = handler.body.species;

              const saved = await newCordyceps.save();

              // JWT payload is based off record id
              const accessToken = await handler.jwt.sign({
                recordId: saved._id
              });

              // Returning JTW to the client (via headers)
              handler.set.headers = {
                'X-Authorization': accessToken,
              };
              handler.set.status = 201;

              return newCordyceps;
            } catch (e: any) {
              // If unique mongoose constraint (for species) is violated
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
      .get('/', async ({ set }: Elysia.Set) => {
        try {
          const cordyceps = await Cordyceps.find({});
          return cordyceps;
        } catch (e: unknown) {
          set.status = 500;
          return {
            message: 'Unable to retrieve items from the database!',
            status: 500,
          };
        }
      })

      .get('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const existingCordyceps = await Cordyceps.findById(id);

          if (!existingCordyceps) {
            handler.set.status = 404;
            return {
              message: 'Requested resource was not found!',
              status: 404,
            };
          }

          return existingCordyceps;
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to retrieve the resource!',
            status: 500,
          };
        }
      })

      .patch('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const changes: Partial<ICordyceps> = handler.body;

          const updatedCordyceps = await Cordyceps.findOneAndUpdate(
            { _id: id },
            { $set: { ...changes } },
            { new: true }
          );

          if (!updatedCordyceps) {
            handler.set.status = 404;
            return {
              message: `Cordyceps with id: ${id} was not found.`,
              status: 404,
            };
          }

          return updatedCordyceps;
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to update resource!',
            status: 500,
          };
        }
      })

      .delete('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const existingCordyceps = await Cordyceps.findById(id);

          if (!existingCordyceps) {
            handler.set.status = 404;
            return {
              message: `Cordyceps with id: ${id} was not found.`,
              status: 404,
            };
          }

          await Cordyceps.findOneAndRemove({ _id: id });

          return {
            message: `Resource deleted successfully!`,
            status: 200,
          };
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to delete resource!',
            status: 500,
          };
        }
      })
  );
