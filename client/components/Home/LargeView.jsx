import React from 'react';

import Job from './Job';
import { Dropdown } from '../Utils';

export default class LargeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultOrder: 'status',
      menuItems: ['STATUS', 'ROLE', 'LOCATION', 'RECRUITER', 'DATE APPLIED'],
      open: false
    };

    this.handleCompanyNameClicked = this.handleCompanyNameClicked.bind(this);
    this.showJobs = this.showJobs.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  handleCompanyNameClicked(evt) {
    if (evt.target.classList.value.indexOf('dropdown') > -1) return;
    this.setState({open: !this.state.open});
    this.showJobs();
    this.toggleDropDown();
  }

  toggleDropDown() {
    const dropdown = this.companyContainer.querySelector('.dropdown');
    const currDisplay = window.getComputedStyle(dropdown).display;

    if (currDisplay === 'none') dropdown.style.display = 'flex';
    else dropdown.style.display = 'none';
  }

  showJobs() {
    const button = this.companyName;
    button.classList.toggle('active');
    const currDisplay = window.getComputedStyle(this.table).display;

    if (currDisplay === 'none') this.table.style.display = 'table';
    else this.table.style.display = 'none';


  }

  selectSortOption(evt) {
    const target = evt.target;
    // dispatch redux action...
    this.setState({defaultOrder: target.innerText});
  }

  render() {
    return (
      <div className="company-container">
        <div onClick={this.handleCompanyNameClicked}
          ref={el => this.companyContainer = el}
          className="company-name-container">
          <button ref={el => this.companyName = el} className="company-name btn btn-default">
            {this.props.company.toUpperCase()}
            <div className="open-close-help">
              {
                this.state.open ? "Close" : "Open"
              }
            </div>
          </button>
          <Dropdown menuItems={this.state.menuItems} 
            defaultOption={this.state.defaultOrder}
            selectItem={this.selectSortOption}/>
          <Summary data={this.props.data}/>
        </div>
        <table ref={el => this.table = el} className="company-jobs">
          <thead>
            <tr>
              <th></th>
              <th>Status</th>
              <th>Role</th>
              <th>Location</th>
              <th>Recruiter</th>
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.data.jobs.map((job,idx) => (
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
  const jobs = props.data.jobs;
  return (
    <div className="company-summary">
      <div className="jobs-count"># of Jobs: {jobs.length}</div>
      {
        displayStats(statusCount(jobs))
      }
      <div className="recruiter-info">P.O.C: {props.data.recruiter}</div>
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