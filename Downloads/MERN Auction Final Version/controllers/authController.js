const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('../models/userModel');

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  let user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError('Incorrect email or password', 401));
  }
  

  const payload = {
    user: {
      id: user._id
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});

exports.authenticate = catchAsync(async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return next(new AppError('No token, authorization denied', 401));
  }

  // Verify token
  await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return next(new AppError('Token is not valid', 401));
    } else {
      req.user = decoded.user;
      next();
    }
  });
});

exports.getActiveListingsByUser = catchAsync(async (req, res, next) => {
  const listings = await Listing.find(
    {
      createdBy: req.params.user_id
    },
    { active: true }
  );

  res.status(200).json({
    status: 'success',
    listings: listings.length,
    data: {
      listings
    }
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

  if (!isMatch) {
    return next(new AppError('Invalid Credentials', 400));
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(req.body.newPassword, salt);
  await user.save();
  res.status(201).json(req.user);
});
