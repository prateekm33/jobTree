import React from 'react';

import Job from './Job'

export default class LargeView extends React.Component {
  constructor(props) {
    super(props);
    this.showJobs = this.showJobs.bind(this);
  }

  showJobs(evt) {
    const button = evt.target;
    button.classList.toggle('active');
    const currDisplay = window.getComputedStyle(this.table).display;

    if (currDisplay === 'none') this.table.style.display = 'table';
    else this.table.style.display = 'none';


  }

  render() {
    return (
      <div className="company-container">
        <div className="company-name-container">
          <button onClick={this.showJobs} className="company-name btn btn-default">
            {this.props.company.toUpperCase()}
          </button>
          <Summary jobs={this.props.jobs}/>
        </div>
        <table ref={el => this.table = el} className="company-jobs">
          <tbody>
            {
              this.props.jobs.map((job,idx) => (
                <Job key={idx} job={job} type={'table'}/>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

function Summary(props) {
  const statuses = [
    'APPLIED', 'PHONE SCREEN', 'ON SITE', 'REJECTED', 'OFFER'
  ];
  const jobs = props.jobs;
  return (
    <div className="company-summary">
      <div className="jobs-count"></div>
      {
        displayStats(statusCount(jobs))
      }
    </div>
  )
}


function statusCount(jobs) {
  return jobs.reduce((count,job) => {
    count[job.status] = count[job.status] + 1 || 1
    return count;
  }, {})
}

function displayStats(count) {
  const arr = [];
  for (let status in count) {
    arr.push(
      <div key={status} className={status + "-count"}>
        {status} : {count[status]}
      </div>
    )
  }

  return arr;
}