const app = require('../../server');
const supertest = require('supertest');
const User = require('../../models/userModel');
const request = supertest(app);


let id;

// Cleans up database between each test
afterEach(async () => {
  if (id) {
    await User.findByIdAndDelete(id);
  }
  id = null;
});

describe('User Registration Endpoint Tests', () => {
  it('Scenario: valid new user, expect: returns positive status', async () => {
    const res = await request.post('/api/users').send({
      name: 'leyla',
      email: 'leyla@gmail.com',
      password: '12345'
    });
    id = res.body._id;
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: invalid new user (email is already inuse), expect: returns failure status (400)', async () => {
    const user = await request.post('/api/users').send({
      name: 'leyla',
      email: 'leyla@gmail.com',
      password: '12345'
    });

    const res = await request.post('/api/users').send({
      name: 'leyla',
      email: 'leyla@gmail.com',
      password: '12345'
    });
    id = user.body._id;
    expect(res.statusCode).toEqual(400);
  });

  it('Scenario: invalid new user (missing required fields), expect: returns failure status (400)', async () => {
    const res = await request.post('/api/users').send({
      name: 'leyla',
      password: '12345'
    });
    expect(res.statusCode).toEqual(400);
  });
});

describe('User Login Endpoint Tests', () => {
  it('Scenario: invalid login attempt (no user associated with given email), expect: returns failure status (401)', async () => {
    const res = await request.post('/api/auth').send({
      email: 'leyla@gmail.com',
      password: '12345'
    });
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: invalid login attempt (no email/password specified), expect: returns failure status (400)', async () => {
    const res = await request.post('/api/auth').send({});
    expect(res.statusCode).toEqual(400);
  });

  it('Scenario: valid login attempt, expect: returns positive status', async () => {
    const user = await request.post('/api/users').send({
      name: 'leyla',
      email: 'leyla@gmail.com',
      password: '12345'
    });
    const res = await request
      .post('/api/auth')
      .send({ email: 'leyla@gmail.com', password: '12345' });
    id = user.body._id;
    expect(res.statusCode).toEqual(200);
  });
});
