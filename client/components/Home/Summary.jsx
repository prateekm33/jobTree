import React from 'react';

function Summary(props) {
  const statuses = [
    'APPLIED', 'PHONE SCREEN', 'ON SITE', 'REJECTED', 'OFFER'
  ];
  const jobs = props.data.jobs;
  console.log('DATA ---', props.data);
  return (
    <div className="company-summary">
      <div className="jobs-count"># of Jobs: {jobs.length}</div>
      {
        displayStats(statusCount(jobs))
      }
      <div className="recruiter-info">REC: {props.data.recruiter}</div>
    </div>
  )
}

export default Summary;


function statusCount(jobs) {
  return jobs.reduce((count,job) => {
    count[job.status] = count[job.status] + 1 || 1
    return count;
  }, {})
}

const statusAbbrvs = { 'APPLIED': 'APP', 'PHONE-SCREEN': 'PS', 'ON-SITE': 'OS', 'OFFER': 'OFF', 'REJECTED': 'REJ'}

function displayStats(count) {
  const arr = [];
  for (let status in count) {
    arr.push(
      <div key={status} className={status + "-count"}>
        {statusAbbrvs[status]} : {count[status]}
      </div>
    )
  }

  return arr;
}