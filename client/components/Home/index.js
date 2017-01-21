import React from 'react';

import {jobs} from '../../mockData';

import LargeView from './LargeView';
import SmallView from './SmallView';
import Job from './Job';
import NewCompanyForm from './NewCompanyForm';
import { Dropdown } from '../Utils';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      company: null,
      title: 'My Pipeline',
      defaultOrder: 'COMPANY',
      menuItems: [
        'COMPANY',
        '# JOB APPS',
        '# APPLIED',
        '# PHONE-SCREENS',
        '# ON-SITES',
        '# REJECTED',
        '# OFFERS',
      ]
    };

    this.showJobs = this.showJobs.bind(this);
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
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

  handleTitleEdit(evt) {
    const keyCode = evt.keyCode;
    const enter = 13;

    switch (keyCode) {
      case enter:
        if (!evt.shiftKey) {
          evt.preventDefault();
          evt.target.blur();
          this.setState({title: evt.target.innerText});
        }
        return;
      default:
        return;
    }

  }

  selectItem(evt) {
    const target = evt.target;
    this.setState({defaultOrder: target.innerText});
  }

  handleAddBtnClick(evt) {

  }

  render() {
    return (
      <div id='home-container'>
        <div id="jobs-view-header">
          <div onKeyDown={this.handleTitleEdit} contentEditable={true} id="home-title"> {this.state.title} </div>
          <div id="line-2">
            <button id="add-company" onClick={this.handleAddBtnClick} className='btn btn-default glyphicon glyphicon-plus'></button>
            <Dropdown id="company-sort-dd" defaultOption={this.state.defaultOrder} selectItem={this.selectItem} menuItems={this.state.menuItems} />
          </div>
        </div>

        <NewCompanyForm />

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