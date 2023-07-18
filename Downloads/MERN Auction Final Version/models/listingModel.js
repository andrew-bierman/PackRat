const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An item must have a title!'],
    trim: true,
    maxlength: [30, 'A title must be less than 30 characters!']
  },
  slug: {
    unique: true,
    type: String,
    slug: 'title'
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  description: {
    type: String,
    required: [true, 'An item must have a description!'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },

  image: {
    type: String
  },
  currentPrice: { type: Number },
  startPrice: {
    type: Number,
    required: true,
    default: 0
  },
  minIncrement: {
    type: Number,
    required: true,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  category: {
    type: String
  },
  endDate: {
    type: Date,
    required: true
  },
  condition: {
    type: String,
    enum: ['unspecified', 'used', 'new'],
    default: 'unspecified'
  },
  bids: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
      },
      bid: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  shipped: {
    type: Date
  },
  active: { type: Boolean, default: true }
});

//sets the current price to the starting price
ListingSchema.pre('save', function(next) {
  if (!this.currentPrice) {
    this.currentPrice = this.startPrice;
  }
  next();
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
