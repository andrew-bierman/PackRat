const Listing = require('../models/listingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const cloudinary = require('cloudinary');

exports.createListing = catchAsync(async (req, res, next) => {
  const listingBody = {
    ...req.body,
    createdBy: req.user.id,
    startPrice: req.body.startPrice * 100,
    minIncrement: req.body.minIncrement * 100
  };
  
  if (
    listingBody.minIncrement % 1 !== 0 &&
    !!listingBody.minIncrement &&
    listingBody.startPrice % 1 !== 0 &&
    !!listingBody.startPrice
  ) {
    return next(
      new AppError(
        'Money fields are required and must only have two decimal places',
        400
      )
    );
  }
  if (!(listingBody.endDate && listingBody.title && listingBody.description)) {
    return next(new AppError('Missing required fields', 400));
  }
  const newListing = await Listing.create(listingBody);
  res.status(201).json({ listing: newListing });
});

exports.getListingById = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  res.status(200).json({ listing });
});

exports.getListingBySlug = catchAsync(async (req, res, next) => {
  const listing = await Listing.findOne({ slug: req.params.slug }).populate(
    'createdBy'
  );

  if (!listing) {
    return next(new AppError('No listing found', 404));
  }

  res.status(200).json({ listing });
});

exports.getAllListings = catchAsync(async (req, res, next) => {
  let query = Listing.find({});

  // 1) Search by category (e.g Electronics, Pets, cars, etc)
  if (req.query.category) {
    query = Listing.find({ category: req.query.category });
  }

  // 2) Search by listing title (e.g 2004 Toyota Hyundi, Logitech G502, Sony Playstation 4)
  if (req.query.search) {
    let search = req.query.search.split('%20').join(' ');
    const RegEx = new RegExp(search);
    query = query.find({ title: { $regex: RegEx, $options: 'si' } });
  }

  // 3) Advanced Filtering
  if (req.query.createdBy) {
    query = query.find({ createdBy: req.query.createdBy });
  }

  if (req.query.condition) {
    query = query.find({ condition: req.query.condition });
  }

  if (req.query.maxPrice) {
    query = query.find({ currentPrice: { $lte: req.query.maxPrice } });
  }

  if (req.query.minPrice) {
    query = query.find({ currentPrice: { $gte: req.query.minPrice } });
  }

  if (req.query.sortBy) {
    if (req.query.sortBy === 'priceDescending') {
      query = query.sort({ currentPrice: -1 });
    } else if (req.query.sortBy === 'priceAscending') {
      query = query.sort({ currentPrice: 1 });
    }
  }

  // Listing must be active!
  query = query.find({ active: true }).populate('createdBy');

  // 4) Sorting
  if (req.query.sort) {
    let sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // 5) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  req.numListings = (await Listing.find(query)).length;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numListings = await Listing.countDocuments();
    if (skip >= numListings) {
      return next(new AppError('Page count too high', 404));
    }
  }

  const listings = await query;
  req.listings = listings;

  next();
});

exports.endExpiredListings = catchAsync(async (req, res, next) => {
  let listings = req.listings;
  for (const listing of listings) {
    if (listing.endDate.getTime() < Date.now()) {
      listing.active = false;
      if (listing.bids.length > 0) {
        var winningBid = listing.bids.reduce((max, listing) =>
          max.bid > listing.bid ? max : listing
        );
      } else {
        var winningBid = null;
      }
      let winner;
      winningBid === null ? (winner = null) : (winner = winningBid.user);
      await Listing.update(
        { _id: listing._id },
        { $set: { active: false, winner: winner } }
      );
    }
  }
  listings = listings.filter(listing => listing.active);
  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    },
    numListings: req.numListings
  });
});

exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id).populate('createdBy');

  if (!listing) {
    return next(new AppError('There is no listing by this ID', 404));
  }

  if (listing.createdBy._id.toString() === req.user.id) {
    await listing.remove();
    return res.status(200).json(listing);
  } else {
    return next(
      new AppError("You cannot remove a listing you didn't create", 400)
    );
  }
});

exports.updateListing = catchAsync(async (req, res, next) => {
  let listing = await Listing.findById(req.params.id).populate('createdBy');
  if (listing.createdBy._id.toString() === req.user.id) {
    let newListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.status(200).json({ listing: newListing });
  } else {
    return next(
      new AppError("You cannot update a listing you didn't create", 400)
    );
  }
});

exports.makeBid = catchAsync(async (req, res, next) => {
  const bid = {
    user: req.user.id,
    bid: req.body.bid * 100
  };

  if (bid.bid % 1 !== 0 && !!bid.bid) {
    return next(
      new AppError(
        'Money fields are required and must only have two decimal places',
        400
      )
    );
  }

  const listing = await Listing.findById(req.params.id).populate('createdBy');

  if (!listing) {
    return next(new AppError('No listing by that Id', 400));
  }

  if (!listing.active) {
    return next(new AppError('Cannot bid on expired listings', 400));
  }
  let maxBid = Math.max(...listing.bids.map(o => o.bid), 0);

  if (!maxBid) {
    maxBid = listing.startPrice;
  }

  if (req.body.bid * 100 > listing.minIncrement + maxBid) {
    listing.bids.push(bid);
    listing.currentPrice = req.body.bid * 100;
    await listing.save();
    return res.status(200).json({ listing });
  } else {
    return next(new AppError("Your bid isn't high enough", 400));
  }
});

exports.deleteBid = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.listing_id).populate(
    'createdBy'
  );

  listing.bids = listing.bids.filter(bid => {
    return bid._id != req.params.bid_id || bid.user.toString() != req.user.id;
  });
  const maxBid = Math.max(...listing.bids.map(o => o.bid), 0);
  listing.currentPrice = maxBid;
  await listing.save();
  return res.status(200).json(listing);
});

exports.endListing = catchAsync(async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  if (listing.createdBy.toString() === req.user.id) {
    listing.active = false;
  } else {
    return next(new AppError("You cannot end a listing that isn't yours", 400));
  }
  await listing.save();
  return res.status(200).json(listing);
});

exports.getActiveListingsByUser = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({
    createdBy: req.params.user_id,
    active: true
  }).populate('createdBy');

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.getInactiveListingsByUser = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({
    createdBy: req.params.user_id,
    active: false
  }).populate('createdBy');

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.getUsersActiveListings = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({
    createdBy: req.user.id,
    active: true
  }).populate('createdBy');

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.getUsersInactiveListings = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({
    createdBy: req.user.id,
    active: false
  }).populate('createdBy');

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.getUsersWonListings = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({
    winner: req.user.id,
    active: false
  }).populate('createdBy');

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.uploadImage = catchAsync(async (req, res, next) => {
  cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    if (err) {
      console.log('err', err);
      req.json(err.message);
    }
    const pic = { url: result.secure_url, imageId: result.public_id };
    return res.status(200).json(pic);
  });
});
