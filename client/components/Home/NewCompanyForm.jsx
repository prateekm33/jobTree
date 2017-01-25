import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import NewJobsForm from './NewJobsForm';
import { validateForm } from '../Utils';

class NewCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.saveRecruiterName = this.saveRecruiterName.bind(this);
    this.handleAddNewJob = this.handleAddNewJob.bind(this);
    this.setCompanyName = this.setCompanyName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dismissPostMsg = this.dismissPostMsg.bind(this);
    this.state = {
      recruiterName: '',
      deleteIdx: +Infinity,
      jobForms: [],
      companyName: '',
      extraFormInvalidMsg: ''
    }
  }

  componentWillMount() {
    this.props.dispatch(actions.resetCompanyForm());
  }
  componentDidMount() {
    this.companyNameInput.focus();
  }

  handleAddNewJob(evt) {
    evt.preventDefault();
    this.props.dispatch(actions.createNewJob());
    this.errMsg2.style.display = 'none';
  }

  setCompanyName(evt) {
    const text = evt.target.value;
    if (text) evt.target.style.border = '';
    this.setState({companyName: text});
  }

  saveRecruiterName(evt) {
    if (evt.target.value) evt.target.style.border = '';
    this.setState({recruiterName: evt.target.value});
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    const msg = validateForm(this.formEl);
    const inputs = msg.inputs;
    this.setState({extraFormInvalidMsg: msg.msg || ''});

    if (!msg.valid) {
      this.errMsg1.style.display = this.errMsg2.style.display = 'flex';

      inputs.forEach(i => {
        i.style.border = '2px solid red';
      });
      return;
    }

    this.errMsg1.style.display = this.errMsg2.style.display = 'none';

    const companyData = {};
    inputs.forEach(i => {i.style.border = '';});
    companyData.company = this.state.companyName;
    companyData.recruiter = this.state.recruiterName;
    const newJobs = Array.prototype.slice.call(this.formEl.querySelectorAll('.new-job'));
    const self = this;
    companyData.jobs = newJobs.map(job => {
      const inputs = Array.prototype.slice.call(job.querySelectorAll('input'));
      console.log('inputs - ', inputs, 'for ', job);
      const newJob = {company: self.state.companyName};
      inputs.forEach(input => {
        switch (input.id) {
          case 'role-name':
            newJob.role = input.value;
            return;
          case 'location-name':
            newJob.location = input.value;
            return;
          case 'recruiter-name':
            newJob.recruiter = input.value;
            return;
          case 'date-applied':
            newJob.date_applied = input.value;
            return;
          default: return;
        }
      });

      const dd = job.querySelector('#status-dd-job-form');
      newJob.status = dd.querySelector('.dropdown-toggle').innerText;

      return newJob;
    });
    console.log('COMPANY DATA - ', companyData);
    this.props.dispatch(actions.postNewJobs(companyData));
    this.props.dispatch(actions.addNewJobsToState(companyData));
  }

  dismissPostMsg() {
    this.props.dispatch(actions.resetJobsPost());
  }

  render() {

    return (
      <form ref={el => this.formEl = el} onSubmit={this.handleFormSubmit} id='new-company'>
        <div className="form-title">New Company Form</div>
        {
          this.props.postedJobs ? <div className="post-msg">
            <div onClick={this.dismissPostMsg} id='dismiss-btn'>Dismiss</div>
            {
              this.props.postedSuccessfully ? <div className="success">Saved!</div> : <div className="error">Oops! Something went wrong</div>
            }
          </div> :  null
        }
        <div ref={el => this.errMsg1 = el} className="form-invalid-msg">
          <div>Please fill out the required fields</div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="company-name">Company Name </label>
            <input onBlur={this.setCompanyName} ref={el => this.companyNameInput = el} id="company-name" className="form-control" placeholder="Company name" />
          </div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="company-recruiter-name">Recruiter Name </label>
            <input onBlur={this.saveRecruiterName} id="company-recruiter-name" className="form-control" placeholder="Recruiter name" />
          </div>
        </div>
        <div id="jobs-forms-container">
          <div className="form-line">
            <div style={{fontSize: '1.2em', fontWeight: 'bold', height: "50%", alignSelf: "flex-end"}}>New Jobs</div>
            <input type='submit' className="btn btn-primary" value="Save!" />
            <button onClick={this.handleAddNewJob} className="btn btn-default glyphicon glyphicon-plus"></button>
          </div>
          {
            this.props.newJobsData.reduceRight((arr,job,idx) => {
              arr.push(<NewJobsForm recruiterName={this.state.recruiterName} company={this.state.companyName} job={job} key={idx} idx={idx} />)
              return arr;
              }, [])
          }
        </div>
        <div ref={el => this.errMsg2 = el} className='form-invalid-msg'>
          {this.state.extraFormInvalidMsg}
        </div>
      </form>
    )
  }
}


function mapStateToProps(state) {
  return { newJobsData: state.newJobsData, postedJobs: state.postedJobs, postedSuccessfully: state.postedSuccessfully }
}

export default connect(mapStateToProps)(NewCompanyForm);