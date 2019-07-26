import request from 'supertest';
import MockDate from 'mockdate';
import app from '../src/app';

beforeEach(() => {
  MockDate.set('2019-07-17T09:18:29.044Z');
  Date.now = jest.fn(() => 9988973);
});

afterEach(() => {
  MockDate.reset();
});

describe('API Routes', () => {
  test('/Contact route to return empty list of contacts when none exists', () => {
    return request(app)
      .get('/contacts/')
      .expect(200)
      .expect({ data: [] });
  });

  test('/contacts post a contact information and returns same contact ', () => {
    return request(app)
      .post('/contacts')
      .send({
        title: 'mrs.',
        fullName: 'Solomon Ogbodo',
        phone: '07032150416',
        mobile: '+2348136503501',
        email: 'solomon@gmail.com',
        homeAddress: 'Nyanya Abuja',
        company: 'Decagon',
        country: 'Nigeria',
        state: 'Abuja',
        street: 'Dantata road',
        zipCode: '10239891',
      })
      .expect(200)
      .expect({
        data: [
          {
            metadata: {
              contactID: '9988973',
              blocked: false,
              createdAt: '2019-07-17T09:18:29.044Z',
            },
            contact: {
              title: 'mrs.',
              fullName: 'Solomon Ogbodo',
              phone: '07032150416',
              mobile: '+2348136503501',
              email: 'solomon@gmail.com',
              homeAddress: 'Nyanya Abuja',
              company: 'Decagon',
              country: 'Nigeria',
              state: 'Abuja',
              street: 'Dantata road',
              zipCode: '10239891',
            },
          },
        ],
      });
  });

  test('/Returns status code 400 for bad request ', () => {
    return request(app)
      .post('/contacts')
      .send({
        title: 'mrs.',
        phone: '07032150416',
        mobile: '+2348136503501',
        email: 'solomon@gmail.com',
        homeAddress: 'Nyanya Abuja',
        company: 'Decagon',
        country: 'Nigeria',
        state: 'Abuja',
        street: 'Dantata road',
        zipCode: '10239891',
      })
      .expect(400);
  });

  test('/Contact route to get a single contacts information', () => {
    return request(app)
      .get('/contacts/9988973')
      .expect(200)
      .expect({
        data: {
          metadata: {
            contactID: '9988973',
            blocked: false,
            createdAt: '2019-07-17T09:18:29.044Z',
          },
          contact: {
            title: 'mrs.',
            fullName: 'Solomon Ogbodo',
            phone: '07032150416',
            mobile: '+2348136503501',
            email: 'solomon@gmail.com',
            homeAddress: 'Nyanya Abuja',
            company: 'Decagon',
            country: 'Nigeria',
            state: 'Abuja',
            street: 'Dantata road',
            zipCode: '10239891',
          },
        },
      });
  });
  test('/Returns 404 when wrong contact id is used to get contact information', () => {
    return request(app)
      .get('/contacts/12345')
      .expect(404)
      .expect({
        message: '12345 did not match any contact record',
      });
  });

  test('/Contact route to return all contacts', () => {
    return request(app)
      .get('/contacts/')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(1);
      });
  });

  test('/Contact route to edit a single contact', () => {
    return request(app)
      .patch('/contacts/9988973')
      .send({
        title: 'pastor',
        fullName: 'Mary Ogbodo',
      })
      .expect(200)
      .expect({
        data: [
          {
            metadata: {
              contactID: '9988973',
              blocked: false,
              createdAt: '2019-07-17T09:18:29.044Z',
              updatedAt: '2019-07-17T09:18:29.044Z',
            },
            contact: {
              title: 'pastor',
              fullName: 'Mary Ogbodo',
              phone: '07032150416',
              mobile: '+2348136503501',
              email: 'solomon@gmail.com',
              homeAddress: 'Nyanya Abuja',
              company: 'Decagon',
              country: 'Nigeria',
              state: 'Abuja',
              street: 'Dantata road',
              zipCode: '10239891',
            },
          },
        ],
      });
  });

  test('/Returns 404 when wrong contact data format is used to edit contact information ', () => {
    return request(app)
      .patch('/contacts/9988973')
      .send({
        title: 'Eng.',
        fullName: '212355',
      })
      .expect(400);
  });

  test('/Returns 404 status code for a wrong id update ', () => {
    return request(app)
      .patch('/contacts/12345')
      .send({
        title: 'pastor',
        fullName: 'Mary Ogbodo',
      })
      .expect(404)
      .expect({
        message: '12345 did not match any contact record',
      });
  });

  test('/block route to block a contact information and expect the rest of unblocked contacts returned', () => {
    return request(app)
      .post('/block/9988973')
      .expect(200)
      .expect({ data: [] });
  });

  test('/block route to return all blocked contacts', () => {
    return request(app)
      .get('/block')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(1);
      });
  });

  test('/Returns 404 status code when trying to block a contact with a wrong id ', () => {
    return request(app)
      .post('/block/12345')
      .expect(404)
      .expect({
        message: '12345 did not match any contact record',
      });
  });

  test('/block route to get a single blocked contact information', () => {
    return request(app)
      .get('/block/9988973')
      .expect(200)
      .expect({
        data: {
          metadata: {
            contactID: '9988973',
            blocked: true,
            createdAt: '2019-07-17T09:18:29.044Z',
            updatedAt: '2019-07-17T09:18:29.044Z',
          },
          contact: {
            title: 'pastor',
            fullName: 'Mary Ogbodo',
            phone: '07032150416',
            mobile: '+2348136503501',
            email: 'solomon@gmail.com',
            homeAddress: 'Nyanya Abuja',
            company: 'Decagon',
            country: 'Nigeria',
            state: 'Abuja',
            street: 'Dantata road',
            zipCode: '10239891',
          },
        },
      });
  });

  test('/Returns 404 status code when trying to get a blocked contact with a wrong id ', () => {
    return request(app)
      .get('/block/12345')
      .expect(404)
      .expect({
        message: '12345 did not match any contact record',
      });
  });

  test('/block route to unblock a contact information to expect the rest of blocked contacts', () => {
    return request(app)
      .post('/block/9988973')
      .expect(200)
      .expect({ data: [] });
  });

  test('/returns 404 when a wrong contact id is used for request', () => {
    return request(app)
      .delete('/contacts/12345')
      .expect(404)
      .expect({
        message: '12345 did not match any contact record',
      });
  });

  test('/Contact route to delete a single contacts information', () => {
    return request(app)
      .delete('/contacts/9988973')
      .expect(200)
      .expect({
        data: [],
      });
  });
});
