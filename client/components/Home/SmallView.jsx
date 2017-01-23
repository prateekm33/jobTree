import React from 'react';

import Job from './Job';

export default class SmallView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.toggleJobs = this.toggleJobs.bind(this);
  }

  toggleJobs(evt) {
    evt.preventDefault();
    const currDisplay = window.getComputedStyle(this.jobsContainer).display;

    if (currDisplay === 'none') this.jobsContainer.style.display = 'flex';
    else this.jobsContainer.style.display = 'none';

    this.setState({open: !this.state.open});
    this.toggleButton.classList.toggle('active');
  }

  render() {
    return (
      <div ref={this.props.refFn} className="company-container">
        <button ref={el => this.toggleButton = el} onClick={this.toggleJobs} className="company-name btn btn-default">
          {this.props.company}
          <div>{this.state.open ? "Close" : "Click to view jobs"}</div>
        </button>
        <div ref={el => this.jobsContainer = el} className="sv-company-jobs-container">
          {
            this.props.data.jobs.map(job => (
              <Job job={job} type="small"/>
            ))
          }
        </div>
      </div>
    )
  }
}