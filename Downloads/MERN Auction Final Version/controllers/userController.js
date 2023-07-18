const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const dotenv = require('dotenv').config({ path: '../.env' });

const User = require('../models/userModel');
const Listing = require('../models/listingModel');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return next(new AppError('Missing required fields', 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new AppError('Email is already in use', 400));
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });

  user = new User({
    name,
    email,
    avatar,
    password
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ ...user._doc, token });
    }
  );
});

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const profile = await User.findById(req.user.id).select('-password');
  if (!profile) {
    return next(new AppError('There is no profile for this user', 404));
  }

  res.json(profile);
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findOneAndRemove({ _id: req.user.id });
  res.status(204).json({ msg: 'User deleted' });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(201).json({
    status: 'success',
    users: users.length,
    data: {
      users
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('No user by this ID', 404));
  }

  await user.update(req.body);

  res.status(200).json({ msg: 'Updated User' });
});

exports.getUserBidHistory = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({
    bids: { $elemMatch: { user: req.user.id } }
  }).populate('createdBy');

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return next(new AppError('No user found', 404));
  }
  res.status(200).json(user);
});
