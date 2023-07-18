const mongoose = require('mongoose');


const ReportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  reported: {
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: 'reportedRef'
  },
  reason: {
    type: String,
    required: true
  },
  reportedRef: {
    type: String,
    required: true,
    enum: ['user', 'Listing', 'review']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Report = mongoose.model('report', ReportSchema);
