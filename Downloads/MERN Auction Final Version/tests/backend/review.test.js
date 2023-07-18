const app = require('../../server');
const supertest = require('supertest');
const Review = require('../../models/reviewModel');
const request = supertest(app);

let token;
let userId;
let reviewerId;
beforeAll(async () => {
  const res = await request.post('/api/users').send({
    name: 'leyla',
    email: 'reviewtest1@gmail.com',
    password: '12345'
  });
  token = res.body.token;
  reviewerId = res.body._id;
  const user = await request.post('/api/users').send({
    name: 'leyla',
    email: 'reviewtest2@gmail.com',
    password: '12345'
  });
  userId = user.body._id;
});

// Cleans up database between each tests
afterEach(async () => {
  await Review.deleteMany();
});

// Cleans up database after all tests
afterAll(async () => {
  await User.findByIdAndDelete(userId);
  await User.findByIdAndDelete(reviewerId);
});

describe('Create Review Endpoint Tests', () => {
  it('Scenario: Create valid review, expect: returns positive status', async () => {
    const res = await request
      .post(`/api/review/${userId}`)
      .set('x-auth-token', token)
      .send({
        title: 'Test review',
        rating: 5,
        text: 'Test review description'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: Create invalid review (Missing required fields), expect: returns negative status', async () => {
    const res = await request
      .post(`/api/review/${userId}`)
      .set('x-auth-token', token)
      .send({});
    expect(res.statusCode).toEqual(500);
  });

  it('Scenario: Create invalid review (No auth token), expect: returns negative status', async () => {
    const res = await request.post(`/api/review/${userId}`).send({
      title: 'Test review',
      rating: 5,
      text: 'Test review description'
    });
    expect(res.statusCode).toEqual(401);
  });

  it("Scenario: Create invalid review (User doesn't exist), expect: returns negative exist", async () => {
    const res = await request
      .post(`/api/review/fakeuser`)
      .set('x-auth-token', token)
      .send({
        title: 'Test review',
        rating: 5,
        text: 'Test review description'
      });
    expect(res.statusCode).toEqual(500);
  });
});
