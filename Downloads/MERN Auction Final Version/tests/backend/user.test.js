const app = require('../../server');
const supertest = require('supertest');
const User = require('../../models/userModel');
const request = supertest(app);

let id;

// Cleans up database between each tests
afterEach(async () => {
  if (id) {
    await User.findByIdAndDelete(id);
  }
  id = null;
});

describe('Get Current User Endpoint Tests', () => {
  it('Scenario: Successfully get user profile, expect: returns positive status', async () => {
    const user = await request.post('/api/users').send({
      name: 'leyla',
      email: 'usertest@gmail.com',
      password: '12345'
    });
    let token = user.body.token;
    const res = await request.get('/api/users/me').set('x-auth-token', token);
    id = user.body._id;
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: Fail to get user profile (missing token), expect: returns negative status', async () => {
    const res = await request.get('/api/users/me');
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Fail to get user profile (invalid token), expect: returns negative status', async () => {
    const res = await request
      .get('/api/users/me')
      .set('x-auth-token', '21DASDFas7fa78fafFa*F7arykadAHDa');
    expect(res.statusCode).toEqual(401);
  });
});

describe('Delete Current User Endpoint Tests', () => {
  it('Scenario: Successfully delete user profile, expect: returns positive status', async () => {
    const user = await request.post('/api/users').send({
      name: 'leyla',
      email: 'usertest@gmail.com',
      password: '12345'
    });
    let token = user.body.token;
    const res = await request
      .delete('/api/users/me')
      .set('x-auth-token', token);
    id = user.body._id;
    expect(res.statusCode).toEqual(204);
  });

  it('Scenario: Fail to delete user profile (missing token), expect: returns negative status', async () => {
    const res = await request.delete('/api/users/me');
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Fail to delete user profile (invalid token), expect: returns negative status', async () => {
    const res = await request
      .delete('/api/users/me')
      .set('x-auth-token', '21DASDFas7fa78fafFa*F7arykadAHDa');
    expect(res.statusCode).toEqual(401);
  });
});

describe('Update Current User Endpoint Tests', () => {
  it('Scenario: Successfully update user profile, expect: returns positive status', async () => {
    const user = await request.post('/api/users').send({
      name: 'leyla',
      email: 'usertest@gmail.com',
      password: '12345'
    });
    let token = user.body.token;
    const res = await request
      .patch('/api/users/me')
      .set('x-auth-token', token)
      .send({
        name: 'leyla',
        email: 'newemail@gmail.com'
      });
    id = user.body._id;
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: Fail to update user profile (missing token), expect: returns negative status', async () => {
    const res = await request.patch('/api/users/me');
    expect(res.statusCode).toEqual(401);
  });
  

  it('Scenario: Fail to update user profile (invalid token), expect: returns negative status', async () => {
    const res = await request
      .patch('/api/users/me')
      .set('x-auth-token', '21DASDFas7fa78fafFa*F7arykadAHDa');
    expect(res.statusCode).toEqual(401);
  });
});
