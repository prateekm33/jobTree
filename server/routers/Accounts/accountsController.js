const passport = require('../../config/passport.js');
const { User } = require('../../config/schema.js');
const utils = require('../Utils');

module.exports = {
  addAccount(req, res) {
    const userCreds = req.body;
    const newUser = new User(userCreds);
    newUser.save().then((user,err) => {
      if (err) res.status(400).json(null);
      else {
        req.login(user, (err) => {
          if (err) res.status(400).json(null);
          else res.status(201).json(user.username);
        })
      }
    }).catch(e => {
      console.log('ERROR CODE', e);
      res.status(400).json(e.code);
    });
  },

  getAccount(req, res) {
    if (req.user.username !== req.params.user) return res.status(401).end();

    res.json(req.user);
  },

  deleteAccount(req, res) {
    if (req.user.username !== req.params.user) return res.status(401).end();

    User.remove({username: req.user.username, password: req.user.password})
      .then(result => { res.status(200).end(); });
  },

  updateAccount(req, res) {
    if (req.user.username !== req.params.user) return res.status(401).end();

    // TODO -- UPDATE ACCOUNT DETAILS
    User.findOne({username: req.user.username, password: req.user.password})
      .then(user => {
        if (!user) return res.status(404).end();
        console.log('UPDATING USER : ', user.username);
        user.update(req.body.options).then(result => {
          res.status(200).end();
        })
      })
  },






  getJobs(req, res) {
    const user = req.params.user;
    if (req.user.username !== user) return res.status(404).end();
    
    User.findOne({username: user})
      .then(user => {
        if (user) {
          const jobs = utils.formatJobs(user.jobs);
          res.json(jobs);
        } else {
          res.json(null);
        }
      })
  },

  addJobs(req, res) {
    if (req.user.username !== req.params.user) return res.status(401).end();

    const data = req.body.data;
    const jobs = data.jobs;
    const user = req.params.user;
    User.update({username: user}, { $pushAll: {jobs: jobs} }).
      then((r, e) => {
        !e && res.status(201).end();
        e && res.status(400).end();
      });
  },

  updateJobs(req, res) {
    console.log('================ UPDATING JOBS =================')
    if (req.user.username !== req.params.user) return res.status(401).end();

    const jobs = utils.undoFormatting(req.body.companies);
    console.log('JOBS FORMATTED: ', jobs)
    User.update({username: req.user.username, password: req.user.password}, {jobs: jobs})
      .then((r,e) => {
        !e && res.status(200).end();
        e && res.status(400).end();
      })
  }
}