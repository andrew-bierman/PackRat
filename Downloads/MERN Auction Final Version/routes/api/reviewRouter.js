const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


const reviewController = require('../../controllers/reviewController');
const authController = require('../../controllers/authController');

// @route    POST api/review/:id/mark-helpful
// @desc     Make a review as helpful
// @access   Private
router.post(
  '/:id/mark-helpful',
  authController.authenticate,
  reviewController.markReviewAsHelpful
);

// @route    POST api/review/:id
// @desc     Create a review for a user
// @access   Private
router.post('/:id', authController.authenticate, reviewController.createReview);

// @route    GET api/review/:id
// @desc     Get all the reviews written for a user
// @access   Public
router.get('/:id', reviewController.getReviewsForUserId);

// @route    GET api/review/:id
// @desc     Get all the reviews written for a user
// @access   Public
router.get('/:id/one', reviewController.getReviewById);

// @route    GET api/review/me
// @desc     Get all the reviews written by your account
// @access   Private
router.get(
  '/',
  authController.authenticate,
  reviewController.getReviewsWrittenByUserId
);

// @route    DELETE api/review/:id
// @desc     Delete a Review
// @access   Private
router.delete(
  '/:id',
  authController.authenticate,
  reviewController.deleteReview
);

// @route    PATCH api/review/:id
// @desc     Update a Review
// @access   Private
router.patch(
  '/:id',
  authController.authenticate,
  reviewController.updateReview
);

module.exports = router;
