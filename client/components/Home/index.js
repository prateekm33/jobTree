import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import {jobs} from '../../mockData';

import LargeView from './LargeView';
import SmallView from './SmallView';
import Job from './Job';
import NewCompanyForm from './NewCompanyForm';
import { Dropdown } from '../Utils';


class Home extends React.Component {
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
    
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.toggleCompanyForm = this.toggleCompanyForm.bind(this);
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
        <SmallView key={company} data={jobs[company]} company={company} />
      );
    }

    return arr;
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
    evt.preventDefault();
    this.props.dispatch(actions.toggleCompanyForm());
  }

  toggleCompanyForm(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'BUTTON') return;
    
    this.props.dispatch(actions.toggleCompanyForm());

    if (evt.target.id === 'add-company') {
      evt.target.style.display = 'none';
      evt.target.nextElementSibling.style.display = 'flex';
      this.helpForAdd.style.display = 'none';
      this.helpForCancel.style.display = 'flex';
    } else if (evt.target.id === 'cancel-company') {
      evt.target.style.display = 'none';
      evt.target.previousElementSibling.style.display = 'flex';
      this.helpForAdd.style.display = 'flex';
      this.helpForCancel.style.display = 'none';
    }
  }

  render() {
    return (
      <div id='home-container'>
        <div id="jobs-view-header">
          <div onKeyDown={this.handleTitleEdit} contentEditable={true} id="home-title"> {this.state.title} </div>
          <div id="line-2">
            <div id="form-toggle-options" onClick={this.toggleCompanyForm}> 
              <button id="add-company" className='btn btn-default glyphicon glyphicon-plus'></button>
              <button id="cancel-company" className='btn btn-default glyphicon glyphicon-remove'></button>
              <div id='company-form-btn-help'>
                <div ref={el => this.helpForAdd = el} id="help-for-add">Click to open new company form</div>
                <div ref={el => this.helpForCancel = el} id="help-for-cancel">Click to cancel form</div>
              </div>
            </div>
            <Dropdown id="company-sort-dd" defaultOption={this.state.defaultOrder} selectItem={this.selectItem} menuItems={this.state.menuItems} />
          </div>
        </div>

        { this.props.showCompanyForm ? <NewCompanyForm /> : null }

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

function mapStateToProps(state) {
  return { showCompanyForm: state.showCompanyForm };
}

export default connect(mapStateToProps)(Home);