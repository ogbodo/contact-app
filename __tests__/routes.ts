import request from 'supertest';
import app from '../src/app';

describe('API Routes', () => {
  test('/Contact route to return empty list of contacts when none exists', () => {
    return request(app)
      .get('/contacts/')
      .expect(200)
      .expect({ data: [] });
  });

  test('/contacts post a contact information and returns same contact ', () => {
    Date.now = jest.fn(() => 9988973);

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
              createdAt: '7/16/2019',
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

  test('/Contact route to get a single contacts information', () => {
    return request(app)
      .get('/contacts/9988973')
      .expect(200)
      .expect({
        data: {
          metadata: {
            contactID: '9988973',
            blocked: false,
            createdAt: '7/16/2019',
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
              createdAt: '7/16/2019',
              updatedAt: '7/16/2019',
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

  test('/block route to block a contact information', () => {
    return request(app)
      .post('/block/9988973')
      .expect(200)
      .expect({ data: [] });
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
            createdAt: '7/16/2019',
            updatedAt: '7/16/2019',
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

  test('/block route to unblock a contact information', () => {
    return request(app)
      .post('/block/9988973')
      .expect(200)
      .expect({ data: [] });
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
