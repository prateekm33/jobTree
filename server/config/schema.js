const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  companies: { type: [
    {
      company: String,
      recruiter: String,
      jobs: [{
        company: String,
        role: String,
        status: String,
        location: String,
        recruiter: String,
        date_applied: { type: Date, default: Date.now },
      }, default: []]
    }
  ], default: []}
});

const User = mongoose.model('User', userSchema);
module.exports = {
  User
}