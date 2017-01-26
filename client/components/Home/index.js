import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import LargeView from './LargeView';
import SmallView from './SmallView';
import Job from './Job';
import NewCompanyForm from './NewCompanyForm';
import { Dropdown } from '../Utils';

import menuItems from './companySortItems';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      company: null,
      title: 'My Pipeline',
      defaultOrder: 'Select order',
      menuItems: menuItems
    };
    
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
    this.selectSort = this.selectSort.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.toggleCompanyForm = this.toggleCompanyForm.bind(this);
  }

  renderLargeView() {
    const arr = [];
    const jobs = this.props.allJobs;
    for (let i = 0; i < jobs.length; i++) {
      arr.push(<LargeView key={i} idx={i} company={jobs[i].company} data={jobs[i].data}/>);
    }

    return arr;
  }

  renderSmallView() {
    const arr = [];

    const jobs = this.props.allJobs;
    for (let i = 0; i < jobs.length; i++) {
      arr.push(
        <SmallView key={i} idx={i} data={jobs[i].data} company={jobs[i].company} />
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

  selectSort(evt) {
    const target = evt.target;
    this.setState({defaultOrder: target.innerText});
    this.props.dispatch(actions.sortCompaniesBy(target.innerText));
  }

  handleAddBtnClick(evt) {
    evt.preventDefault();
    this.props.dispatch(actions.toggleCompanyForm());
  }

  toggleCompanyForm(evt) {
    document.body.scrollTop = 100000000000000;
    evt && evt.preventDefault();
    evt = evt || {};
    const target = evt.target || this.cancelFormBtn;
    if (target.tagName !== 'BUTTON') return;
    
    this.props.dispatch(actions.toggleCompanyForm());

    if (target.id === 'add-company') {
      target.style.display = 'none';
      target.nextElementSibling.style.display = 'flex';
      this.helpForAdd.style.display = 'none';
      this.helpForCancel.style.display = 'flex';
    } else if (target.id === 'cancel-company') {
      target.style.display = 'none';
      target.previousElementSibling.style.display = 'flex';
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
              <button ref={el => this.cancelFormBtn = el} id="cancel-company" className='btn btn-default glyphicon glyphicon-remove'></button>
              <div id='company-form-btn-help'>
                <div ref={el => this.helpForAdd = el} id="help-for-add">Click to open new company form</div>
                <div ref={el => this.helpForCancel = el} id="help-for-cancel">Click to cancel form</div>
              </div>
            </div>
            <Dropdown id="company-sort-dd" defaultOption={this.state.defaultOrder} selectItem={this.selectSort} menuItems={this.state.menuItems} />
          </div>
        </div>

        { this.props.showCompanyForm ? <NewCompanyForm parent={this}/> : null }

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
  return { showCompanyForm: state.showCompanyForm, allJobs: state.allJobs };
}

export default connect(mapStateToProps)(Home);