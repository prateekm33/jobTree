const bcrypt = require('bcrypt-nodejs');

module.exports = {
  validateRequest(req, res, next) {
    if (!req.user) return res.status(401).json(null);
    console.log('USER REQUEST VALIDATED: ', req.user.username)
    next()
  },

  hashPassword(req, res, next) {
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
      if (err) res.status(400).end();
      else {
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
  },

  undoFormatting(companies) {
    console.log('PREFORMATTING ------', companies);
    console.log('--------', companies[0].data.jobs)
    const jobs = [];
    companies.forEach(company => {
      jobs.push(...company.data.jobs)
    });

    return jobs;
  }
}