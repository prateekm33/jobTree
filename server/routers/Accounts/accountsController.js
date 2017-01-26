const passport = require('../../config/passport.js');
const { User } = require('../../config/schema.js');
const utils = require('../Utils');

module.exports = {
  addAccount(req, res) {
    const userCreds = req.body;
    const newUser = new User(userCreds);
    console.log('userCreds: ', userCreds)
    newUser.save().then((user,err) => {
      console.log('errr: ', err);
      if (err) res.status(400).json(null);
      else {
        req.login(user, (err) => {
          if (err) res.status(400).json(null);
          else res.status(201).json(user);
        })
      }
    }).catch(e => {
      res.status(400).json(e.code);
    });
  },

  getAccount(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    res.json(req.user);
  },

  deleteAccount(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    User.remove({email: req.user.email, password: req.user.password})
      .then(result => {
        console.log('REMOVED RESULT: ', result);
        res.status(200).end();
      });
  },

  updateAccount(req, res) {
    if (req.user.email !== req.params.user) return res.status(401).end();

    // TODO -- UPDATE ACCOUNT DETAILS
    User.findOne({email: req.user.email, password: req.user.password})
      .then(user => {
        if (!user) return res.status(404).end();
        console.log('UPDATING USER : ', user);
        user.update(req.body.options).then(result => {
          console.log('UPDATE RESULT: ', result)
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
          console.log('jobs - ', jobs)
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
    console.log('UPDATE JOBS??')
    if (req.user.username !== req.params.user) return res.status(401).end();

    const jobs = req.body.jobs;
    console.log('JOBS TO UPDATE: ', jobs)
    User.update({username: req.user.username, password: req.user.password}, {jobs: jobs})
      .then((r,e) => {
        console.log('RESULT? : ', r);
        !e && res.status(200).end();
        e && res.status(400).end();
      })
  }
}