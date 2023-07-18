const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', userController.createUser);

// @route    GET api/users/me
// @desc     Get current users profile
// @access   Private
router.get('/me', authController.authenticate, userController.getMyProfile);

// @route    GET api/listings/bids
// @desc     Get a users bidding history
// @access   Private
router.get(
  '/bids',
  authController.authenticate,
  userController.getUserBidHistory
);

// @route    PATCH api/users/me
// @desc     Update current users profile
// @access   Private
router.patch('/me', authController.authenticate, userController.updateUser);

// @route    DELETE api/users/me
// @desc     Delete current users profile
// @access   Private
router.delete('/me', authController.authenticate, userController.deleteUser);


// @route    DELETE api/users
// @desc     Delete users account
// @access   Private
router.delete('/', authController.authenticate, userController.deleteUser);

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', userController.getAllUsers);

// @route    GET api/users/:id
// @desc     Get user by Id
// @access   Public
router.get('/:id', userController.getUserById);

module.exports = router;
