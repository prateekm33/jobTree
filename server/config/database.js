const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/jobtree';

mongoose.connect(mongoURI, err => {
  if (err) {
    console.log('CAN NOT CONNECT TO MONGO DATABASE');
    throw err;
  } else {
    console.log('SUCCESSFULLY CONNECTED TO MONGO DATABASE');
  }
});
const db = mongoose.connection;

module.exports.db = db;

