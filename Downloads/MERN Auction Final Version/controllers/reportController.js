const Report = require('../models/reportModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createReport = catchAsync(async (req, res, next) => {
  const { reason, reportedRef } = req.body;

  if (!(reason && reportedRef)) {
    return next(new AppError('Missing required fields', 400));
  }

  
  reportedBy = req.user.id;
  reported = req.params.id;
  report = new Report({
    reportedBy,
    reported,
    reason,
    reportedRef
  });

  await report.save();

  res.status(200).send(report);
});

exports.getReports = catchAsync(async (req, res, next) => {
  const reports = await Report.find().populate('reported reportedBy');
  res.status(200).json({ reports });
});
