const express = require('express');
const router = express.Router();


const reportController = require('../../controllers/reportController');
const authController = require('../../controllers/authController');

// @route    POST api/report/:id
// @desc     Create a report for a user, review or listing
// @access   Private
router.post('/:id', authController.authenticate, reportController.createReport);

router.get('/', reportController.getReports);
module.exports = router;
