const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String
  },
  bio: {
    type: String
  }
});

module.exports = User = mongoose.model('user', UserSchema);
