const bcrypt = require('bcrypt-nodejs');

module.exports = {
  validateRequest(req, res, next) {
    console.log('VALIDATING USER: ', req.user);
    if (!req.user) return res.status(401).json(null);
    console.log('request validated.')
    next()
  },

  hashPassword(req, res, next) {
    console.log('hashing password...')
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
      if (err) res.status(400).end();
      else {
        console.log('HASHED: ', hash);
        req.body.password = hash;
        next();
      }
    })
  },

  formatJobs(jobs) {
    const companies = jobs.reduce((obj, job) => {
      obj[job.company] = obj[job.company] || {};
      obj[job.company].company = job.company;
      obj[job.company].data = obj[job.company].data || {}
      obj[job.company].data.recruiter = job.recruiter;
      obj[job.company].data.jobs = obj[job.company].data.jobs || [];
      obj[job.company].data.jobs.push(job);
      return obj;
    }, {});

    const arr = [];
    for (let company in companies) {
      arr.push(companies[company]);
    }

    return arr;
  }
}