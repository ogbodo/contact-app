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
              createdAt: '7/15/2019',
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
});

test('/Contact route a single contacts information', () => {
  return request(app)
    .get('/contacts/9988973')
    .expect(200)
    .expect({
      data: {
        metadata: {
          contactID: '9988973',
          blocked: false,
          createdAt: '7/15/2019',
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

  test('/home ', () => {
    return request(app)
      .post('/home')
      .send({})
      .expect(res => {
        res.body;
      });
  });
});
