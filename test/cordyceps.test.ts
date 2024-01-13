import { describe, expect, it, afterAll } from 'bun:test';
import { app } from '../src/index';

const baseUrl = `${app.server?.hostname}:${app.server?.port}/api/cordyceps`; // localhost:3000/api/cordyceps

describe('CORDYCEPS Test suite', () => {

  describe('GET Cordyceps suite', () => {

    it('should return a list of cordyceps successfully', async () => {
      const req = new Request(baseUrl);
      const res = await app.fetch(req);
      expect(res.status).toEqual(200);
    });

    it('should return a cordycep successfully using existing id', async () => {

      const expected = {
        nickname: 'Jack31',
        species: 'jack31g@doe.com'
      };

      const cordycepId = '64e87ae42400ef4b2cd1ae95';

      const req = new Request(`${baseUrl}/${cordycepId}`);
      const res = await app.fetch(req);
      expect(res.status).toEqual(200);

      const responseBody = await res.json();

      expect(responseBody.nickname).toEqual(expected.nickname);
      expect(responseBody.species).toEqual(expected.species);
    });

//    it('should not return a cordycep password', async () => {

//      const cordycepId = '64e87ae42400ef4b2cd1ae95';

//      const req = new Request(`${baseUrl}/${cordycepId}`);
//      const res = await app.fetch(req);
//      expect(res.status).toEqual(200);

//      const responseBody = await res.json();
//      expect(responseBody.password).toEqual(undefined);
//    });

    it('should fail to return a cordycep that does not exist', async () => {

      const cordycepId = 'FAKE-ID-FAKE-ID-FAKE-ID-';

      const req = new Request(`${baseUrl}/${cordycepId}`);
      const res = await app.fetch(req);
      expect(res.status).not.toEqual(200);
    });

  });

  describe('CREATE Cordyceps suite', () => {

    it('should create a new cordycep successfully', async () => {

      const newCordycep = {
        nickname: 'BruceWayne',
        species: 'bruce.wayne@gotham.com',
      }

      const expected = {
        nickname: 'BruceWayne',
        species: 'bruce.wayne@gotham.com'
      }

      const req = new Request(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCordycep)
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(201);

      const responseBody = await res.json();
      expect(responseBody.nickname).toEqual(expected.nickname);
      expect(responseBody.species).toEqual(expected.species);
    });

    it('should fail to create a cordycep that already exists', async () => {

      const existingCordycep = {
        nickname: 'Jack31',
        species: 'jack31g@doe.com',
      }

      const expected = {
        message: 'Resource already exists!'
      };

      const req = new Request(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingCordycep)
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(422);

      const responseBody = await res.json();
      expect(responseBody.message).toEqual(expected.message);
    });

    it('should fail to create a cordycep when mandatory fields are not provided', async () => {

      const newCordycep = {
        nickname: 'JamesBond'
      }

      const expected =  {
        message: 'Unable to process the data!',
        status: 400,
      };

      const req = new Request(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCordycep)
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(expected.status);

      const responseBody = await res.json();
      expect(responseBody.message).toEqual(expected.message);
    });

  });

  describe('PATCH Cordyceps suite', () => {

    it('should update a cordycep successfully', async () => {

      const originalCordycep = {
        nickname: 'Batman',
      }

      const updatedCordycep = {
        nickname: 'DarkKnight',
      }

      const cordycepId = '6469eeacf5b9a7f1b1608de7';

      const req = new Request(`${baseUrl}/${cordycepId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCordycep)
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(200);

      const responseBody = await res.json();
      expect(responseBody.nickname).not.toEqual(originalCordycep.nickname);
      expect(responseBody.nickname).toEqual(updatedCordycep.nickname);
    });

    it('should fail to update a cordycep that does not exist', async () => {

      const updatedCordycep = {
        nickname: 'DarkKnight',
      }

      const cordycepId = 'FAKE-ID-FAKE-ID-FAKE-ID-';

      const req = new Request(`${baseUrl}/${cordycepId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCordycep)
      });

      const res = await app.fetch(req);
      expect(res.status).not.toEqual(200);
    });

  });

  describe('DELETE Cordyceps suite', () => {

    it('should delete a cordycep successfully', async () => {

      const cordycepId = '6505d25d2ffbf55d5b958c45';

      const req = new Request(`${baseUrl}/${cordycepId}`, {
        method: 'DELETE',
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(200);
    });

    it('should fail to delete a cordycep that does not exist', async () => {

      const cordycepId = 'FAKE-ID-FAKE-ID-FAKE-ID-';

      const req = new Request(`${baseUrl}/${cordycepId}`, {
        method: 'DELETE'
      });

      const res = await app.fetch(req);
      expect(res.status).not.toEqual(200);
    });

  });

  // In case Bun does not automatically terminate the test runner after all tests run
  afterAll(() => {
    process.exit(0);
  })

});
