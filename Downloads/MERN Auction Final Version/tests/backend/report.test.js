const app = require('../../server');
const supertest = require('supertest');
const Report = require('../../models/reportModel');
const Listing = require('../../models/listingModel');
const User = require('../../models/userModel');
const request = supertest(app);

let token;
let userId;
let listingId;

beforeAll(async () => {
  const res = await request.post('/api/users').send({
    name: 'leyla',
    email: 'reporttest@gmail.com',
    password: '12345'
  });
  token = res.body.token;
  userId = res.body._id;
  const listing = await request
    .post('/api/listings')
    .set('x-auth-token', token)
    .send({
      title: 'Test listing title',
      description: 'Listing to be reported',
      endDate: Date.now() + 100000,
      startPrice: 100,
      minIncrement: 1
    });
  listingId = listing.body.listing._id;
});

// Cleans up database between each tests
afterEach(async () => {
  await Report.deleteMany();
});

// Cleans up database after all tests
afterAll(async () => {
  await Listing.findByIdAndDelete(listingId);
  await User.findByIdAndDelete(userId);
});

describe('Create Report Endpoint Tests', () => {
  it('Scenario: Create valid report, expect: returns positive status', async () => {
    const res = await request
      .post(`/api/report/${listingId}`)
      .set('x-auth-token', token)
      .send({
        reportedRef: 'Listing',
        reason: 'Test report'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: Create invalid report (Missing required fields), expect: returns negative status', async () => {
    const res = await request
      .post(`/api/report/${listingId}`)
      .set('x-auth-token', token)
      .send({});
    expect(res.statusCode).toEqual(400);
  });

  it('Scenario: Create invalid report (listing user reported does not exist), expect: returns negative status', async () => {
    const res = await request
      .post(`/api/report/fakelisting`)
      .set('x-auth-token', token)
      .send({ reportedRef: 'Listing', reason: 'Test report' });
    expect(res.statusCode).toEqual(500);
  });
});
