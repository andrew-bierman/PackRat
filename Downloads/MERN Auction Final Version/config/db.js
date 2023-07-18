const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: '../.env' });

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      var dbName = 'test';
    } else {
      var dbName = 'Production';
    }

    // await mongoose.connect(process.env.MONGO_URI, {
    await mongoose.connect("mongodb+srv://admin:123@cluster0.h1vvj.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      dbName
    });

    console.log(`MongoDB Connected to ${dbName} DB...`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
