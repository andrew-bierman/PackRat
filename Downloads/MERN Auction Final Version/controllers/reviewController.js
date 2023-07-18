const Review = require('../models/reviewModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
  const { title, text, rating } = req.body;
  writtenBy = req.user.id;
  writtenFor = req.params.id;

  
  review = new Review({
    writtenBy,
    writtenFor,
    title,
    text,
    rating
  });

  await review.save();

  res.status(200).send(review);
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  res.status(200).json({ review });
});

exports.getReviewsForUserId = catchAsync(async (req, res, next) => {
  let query = Review.find({ writtenFor: req.params.id }).sort({
    helpfulCount: -1
  });

  const numListings = Review.find({ writtenFor: req.params.id }).count();
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const reviews = await query;
  res.status(200).json(reviews);
});

exports.getReviewsWrittenByUserId = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ writtenBy: req.user.id });
  res.status(200).send(reviews);
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review by this ID', 404));
  }

  if (review.writtenBy.toString() === req.user.id) {
    await review.remove();
    return res.status(200).json(review);
  } else {
    return next(new AppError("Cannot delete a review you didn't write", 400));
  }
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { writtenBy: req.user.id },
    req.body,
    { returnOriginal: false }
  );
  return res.status(200).json(review);
});

exports.markReviewAsHelpful = catchAsync(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  const found = review.markedAsHelpful.some(el => el.user == req.user.id);

  if (!found) {
    review.markedAsHelpful.push({ user: req.user.id });
    review.helpfulCount = review.helpfulCount + 1;
  }

  await review.save();

  res.status(200).json({ review });
});
