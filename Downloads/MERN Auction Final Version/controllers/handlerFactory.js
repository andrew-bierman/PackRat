const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true //validators in schema are RUN again!
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); //return so that we end the thing immedietly
    }
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // const newTour = new Tour({})
    // newTour.save()
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
