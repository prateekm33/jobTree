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

  formatJobs(companies) {
    return companies.map(company => {
      return {
        company: company.company,
        data: {
          recruiter: company.recruiter,
          jobs: company.jobs
        }
      }
    });
  }
}