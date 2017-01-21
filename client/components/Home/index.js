import React from 'react';

import {jobs} from '../../mockData';

import LargeView from './LargeView';
import SmallView from './SmallView';
import Job from './Job';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      company: null
    };

    this.showJobs = this.showJobs.bind(this);
  }

  renderLargeView() {
    const arr = [];
    for (let company in jobs) {
      arr.push(<LargeView key={company} company={company} data={jobs[company]}/>);
    }

    return arr;
  }

  renderSmallView() {
    const arr = [];

    for (let company in jobs) {
      arr.push(
        <SmallView showJobs={this.showJobs} key={company} jobs={jobs[company]} company={company} />
      );
    }

    return arr;
  }

  showJobs() {

  }

  render() {
    return (
      <div id='home-container'>
        <div contentEditable={true} id="home-title"> MY PIPELINE </div>
        <div id='large-jobs-view-container'>
          {
            this.renderLargeView()
          }
        </div>
        <div id='small-jobs-view-container'>
          {
            this.renderSmallView()
          }
        </div>

        <div ref={el => this.jobsContainer = el} className="jobs-container">
          <div>{this.state.company}</div>
          {
            this.state.jobs.map((job,idx) => (
              <Job job={job} key={idx} type="small"/>
            ))
          }
        </div>

      </div>
    )
  }
}