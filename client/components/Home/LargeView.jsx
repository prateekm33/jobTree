import React from 'react';

import Job from './Job'

export default class LargeView extends React.Component {
  constructor(props) {
    super(props);
    this.showJobs = this.showJobs.bind(this);
  }

  showJobs() {
    const currDisplay = window.getComputedStyle(this.table).display;

    if (currDisplay === 'none') this.table.style.display = 'table';
    else this.table.style.display = 'none';
  }

  render() {
    return (
      <div className="company-container">
        <div onClick={this.showJobs} className="company-name-container">
          <div className="company-name">
            {this.props.company.toUpperCase()}
          </div>
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