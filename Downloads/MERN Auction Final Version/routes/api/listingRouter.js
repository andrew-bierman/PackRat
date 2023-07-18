const express = require('express');
const router = express.Router();

const listingController = require('../../controllers/listingController');
const authController = require('../../controllers/authController');
const multer = require('multer');

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

// @route    POST api/listings
// @desc     Create an auction listing
// @access   Private
// router.post('/', authController.authenticate, listingController.createListing);
router.post('/', authController.authenticate, listingController.createListing);

// @route    GET api/listings
// @desc     Query Listings
// @access   Public
router.get(
  '/',
  listingController.getAllListings,
  listingController.endExpiredListings
);

// @route    DELETE api/listings/:id
// @desc     Delete a listing by id
// @access   Private
router.delete(
  '/:id',
  authController.authenticate,
  listingController.deleteListing
);

// @route    GET api/listings/:id
// @desc     Get listing by ID
// @access   public
router.get('/:id', listingController.getListingById);

// @route    GET api/listings/slug/:slug
// @desc     Get listing by Slug
// @access   Private
router.get('/slug/:slug', listingController.getListingBySlug);

// @route    PATCH api/listings/:id
// @desc     Update listing by Id
// @access   Private
router.patch(
  '/:id',
  authController.authenticate,
  listingController.updateListing
);

// @route    POST api/listings/:id/bid
// @desc     Make bid on listing
// @access   Private
router.post('/:id/bid', authController.authenticate, listingController.makeBid);

// @route    DELETE api/listings/:listing_id/bid/bid_id
// @desc     Delete a bid on a listing
// @access   Private
router.delete(
  '/:listing_id/bid/:bid_id',
  authController.authenticate,
  listingController.deleteBid
);

// @route    POST api/listings/:id
// @desc     End an auction
// @access   Private
router.post('/:id', authController.authenticate, listingController.endListing);


// @route    GET api/listings/dashboard/active
// @desc     Get a users active listings by token
// @access   Public
router.get(
  '/dashboard/active',
  authController.authenticate,
  listingController.getUsersActiveListings
);

// @route    GET api/listings/dashboard/inactive
// @desc     Get a users active listings by token
// @access   Public
router.get(
  '/dashboard/inactive',
  authController.authenticate,
  listingController.getUsersInactiveListings
);

// @route    GET api/listings/:user_id/active
// @desc     Get a users active listings by ID
// @access   Public
router.get(
  '/dashboard/won',
  authController.authenticate,
  listingController.getUsersWonListings
);

// @route    GET api/listings/:user_id/active
// @desc     Get a users active listings by ID
// @access   Public
router.get('/:user_id/active', listingController.getActiveListingsByUser);

// @route    GET api/listings/:user_id/inactive
// @desc     Get a users inactive listings by ID
// @access   Public
router.get('/:user_id/inactive', listingController.getInactiveListingsByUser);

// @route    GET api/listings/upload/image
// @desc     Upload image to Cloudinary cloud
// @access   Private
router.post(
  '/upload/image',
  upload.single('image'),
  listingController.uploadImage
);

module.exports = router;
