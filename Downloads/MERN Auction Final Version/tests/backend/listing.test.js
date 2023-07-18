const app = require('../../server');
const supertest = require('supertest');
const Listing = require('../../models/listingModel');
const User = require('../../models/userModel');
const request = supertest(app);

let id;
let token;
let listingId;
// Set authorization token to access protected routes
beforeAll(async () => {
  const res = await request.post('/api/users').send({
    name: 'leyla',
    email: 'listingtest@gmail.com',
    password: '12345'
  });
  token = res.body.token;
  id = res.body._id;
});

// Cleans up database between each tests
afterEach(async () => {
  if (listingId) {
    await Listing.findByIdAndDelete(listingId);
  }
  listingId = null;
});

// Cleans up database after all tests
afterAll(async () => {
  await User.findByIdAndDelete(id);
});

describe('Create Listing Endpoint Tests', () => {
  it('Scenario: Create valid listing, expect: returns positive status', async () => {
    const res = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        startPrice: 100,
        minIncrement: 1,
        description: 'Test listing description',
        endDate: Date.now() + 100000
      });
    listingId = res.body.listing._id;
    expect(res.statusCode).toEqual(201);
  });

  it('Scenario: Create invalid listing (no authorization), expect: returns negative status', async () => {
    const res = await request.post('/api/listings').send({
      title: 'Test listing title',
      description: 'Test listing description',
      startPrice: 100,
      minIncrement: 1,
      endDate: Date.now() + 100000
    });
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Create invalid listing (missing required fields), expect: returns negative status', async () => {
    const res = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description'
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Update Listing Endpoint Tests', () => {
  it('Scenario: Valid listing update, expect: returns positive status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        startPrice: 100,
        minIncrement: 1,
        title: 'Test listing title',
        description: 'Test listing description',
        endDate: Date.now() + 100000
      });

    const res = await request
      .patch(`/api/listings/${listing.body.listing._id}`)
      .set('x-auth-token', token)
      .send({
        title: 'Edited listing title'
      });
    listingId = res.body.listing._id;
    expect(res.statusCode).toEqual(200);
    expect(res.body.listing.title).toEqual('Edited listing title');
  });

  it('Scenario: Invalid listing update (No auth token provided), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        startPrice: 100,
        minIncrement: 1,
        description: 'Test listing description',
        endDate: Date.now() + 100000
      });
    const res = await request
      .patch(`/api/listings/${listing.body.listing._id}`)
      .send({
        title: 'Edited listing title'
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Invalid listing update (Invalid auth token), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        startPrice: 100,
        minIncrement: 1,
        endDate: Date.now() + 100000
      });
    const res = await request
      .patch(`/api/listings/${listing.body.listing._id}`)
      .send({
        title: 'Edited listing title'
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(401);
  });
});

describe('Delete Listing Endpoint Tests', () => {
  it('Scenario: Valid listing delete, expect: returns positive status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        startPrice: 100,
        minIncrement: 1,
        endDate: Date.now() + 100000
      });
    const res = await request
      .delete(`/api/listings/${listing.body.listing._id}`)
      .set('x-auth-token', token)
      .send({
        title: 'Edited listing title'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: Invalid listing delete (No auth token provided), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        startPrice: 100,
        minIncrement: 1,
        endDate: Date.now() + 100000
      });
    const res = await request
      .delete(`/api/listings/${listing.body.listing._id}`)
      .send({
        title: 'Edited listing title'
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Invalid listing delete (Invalid auth token), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        startPrice: 100,
        minIncrement: 1,
        endDate: Date.now() + 100000
      });
    const res = await request
      .delete(`/api/listings/${listing.body.listing._id}`)
      .send({
        title: 'Edited listing title'
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(401);
  });
});

describe('Create Bid Endpoint Tests', () => {
  it('Scenario: Valid bid creation, expect: returns postitive status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        startPrice: 100,
        minIncrement: 1,
        endDate: Date.now() + 100000
      });
    const res = await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 200
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(200);
  });

  it('Scenario: Valid bid creation (Invalid auth token), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        endDate: Date.now() + 100000,
        startPrice: 100,
        minIncrement: 1
      });
    const res = await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', 'dasddasdsaddsadsadasdada')
      .send({
        bid: 200
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Invalid bid creation (No auth token), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        endDate: Date.now() + 100000,
        startPrice: 100,
        minIncrement: 1
      });
    const res = await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .send({
        bid: 200
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(401);
  });

  it('Scenario: Invalid bid creation (Bid is less than the current winning bid), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        endDate: Date.now() + 100000,
        startPrice: 100,
        minIncrement: 1
      });
    await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 200
      });
    const res = await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 100
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(400);
  });

  it('Scenario: Invalid bid creation (Listing user is bidding on does not exist), expect: returns negative status', async () => {
    const res = await request
      .post(`/api/listings/fake-listing/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 50
      });
    expect(res.statusCode).toEqual(400);
  });

  it('Scenario: Invalid bid creation (Bid is less than current winning bid + minimum increment), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        endDate: Date.now() + 100000,
        startPrice: 100,
        minIncrement: 1
      });
    await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 150
      });
    const res = await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 125
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(400);
  });

  it('Scenario: Invalid bid creation (Bidding on inactive listing), expect: returns negative status', async () => {
    const listing = await request
      .post('/api/listings')
      .set('x-auth-token', token)
      .send({
        title: 'Test listing title',
        description: 'Test listing description',
        endDate: Date.now(),
        startPrice: 100,
        minIncrement: 1,
        active: false
      });
    const res = await request
      .post(`/api/listings/${listing.body.listing._id}/bid`)
      .set('x-auth-token', token)
      .send({
        bid: 50
      });
    listingId = listing.body.listing._id;
    expect(res.statusCode).toEqual(400);
  });
});
