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
      menuItems: menuItems,
      windowWidth: 0
    };
    
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
    this.selectSort = this.selectSort.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.toggleCompanyForm = this.toggleCompanyForm.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.setWindowWidth = this.setWindowWidth.bind(this);
    this.dismissPostMsg = this.dismissPostMsg.bind(this);
    window.addEventListener('resize', this.setWindowWidth)
  }

  setWindowWidth() {
    this.setState({windowWidth: window.innerWidth });
  }

  componentWillMount() {
    this.setWindowWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  deleteCompany(idx) {
    document.body.scrollTop = 0;
    this.props.dispatch(actions.deleteCompany(idx));
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

  toggleCompanyForm() {
    this.props.dispatch(actions.toggleCompanyForm());
  }

  dismissPostMsg() {
    this.props.dispatch(actions.resetJobsPost());
  }



  render() {

    return (
      <div id='home-container'>
        <div id="jobs-view-header">
          <div id="home-title"> {this.state.title} </div>
          <div id="line-2">
            <div id="form-toggle-options" ref={el => this.toggleFormOptions = el} className={this.props.allJobs.length ? '' : 'bounce'} onClick={this.toggleCompanyForm}> 
              {
                !this.props.showCompanyForm ? 
                  <button id="add-company" className='btn btn-default glyphicon glyphicon-plus'></button> :
                  <button ref={el => this.cancelFormBtn = el} id="cancel-company" className='btn btn-default glyphicon glyphicon-remove'></button>
              }
              <div id='company-form-btn-help'>
                {
                  !this.props.showCompanyForm ? 
                    <div ref={el => this.helpForAdd = el} id="help-for-add">Click here to add to your pipeline!</div> :
                    <div ref={el => this.helpForCancel = el} id="help-for-cancel">Click to cancel form</div>
                }
              </div>
            </div>
            {
              this.props.postedJobs && this.props.postedSuccessfully ? 
                <div className="post-msg">
                  <div onClick={this.dismissPostMsg} className="success btn btn-primary">Saved!</div>
                </div> : null
            }
            <Dropdown id="company-sort-dd" defaultOption={this.state.defaultOrder} selectItem={this.selectSort} menuItems={this.state.menuItems} />
          </div>
        </div>

        { this.props.showCompanyForm ? <NewCompanyForm parent={this}/> : null }
        {
          this.state.windowWidth >= 651 ? <div id='large-jobs-view-container'>
            {
              this.props.allJobs.map((job, i) => (
                <LargeView key={i} idx={i} company={job.company} data={job.data} deleteCompany={() => this.deleteCompany(i)} />
              ))
            }
          </div> :
          <div id='small-jobs-view-container'>
            {
              this.props.allJobs.map((job, i) => (
                <SmallView key={i} idx={i} company={job.company} data={job.data} deleteCompany={() => this.deleteCompany(i)} />
              ))
            }
          </div>
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { showCompanyForm: state.showCompanyForm, allJobs: state.allJobs, postedSuccessfully: state.postedSuccessfully, postedJobs: state.postedJobs };
}

export default connect(mapStateToProps)(Home);