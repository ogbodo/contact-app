import request from 'supertest';
import app from '../src/app';

describe('API Routes', () => {
  test('/home returns hello world', () => {
    return request(app)
      .get('/api/home')
      .expect(200, { data: 'Hello World' });
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
