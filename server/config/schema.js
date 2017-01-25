const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  jobs: { type: [{
        company: String,
        role: String,
        status: { type: String, default: 'APPLIED'},
        location: String,
        recruiter: String,
        date_applied: { type: Date, default: Date.now },
      }], 
    default: []}
});

const User = mongoose.model('User', userSchema);
module.exports = {
  User
}