import React from 'react';

import NewJobsForm from './NewJobsForm';

export default class NewCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.saveRecruiterName = this.saveRecruiterName.bind(this);
    this.handleAddNewJob = this.handleAddNewJob.bind(this);
    this.deleteJobAt = this.deleteJobAt.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      recruiterName: '',
      count: 1,
      jobForms: []
    }

  }

  componentDidMount() {
    this.createNewForm()
  }

  saveRecruiterName(evt) {
    this.setState({recruiterName: evt.target.value});
  }

  handleAddNewJob(evt) {
    evt.preventDefault();
    this.createNewForm();
    this.setState({count: this.state.count + 1});
  }

  deleteJobAt(idx) {
    const el = this.state.jobForms.splice(idx, 1)[0];
    console.log(el, 'IDX', idx);
    this.forceUpdate();
  }

  createNewForm() {
    const length = this.state.jobForms.length;
    this.state.jobForms.push(
        <NewJobsForm key={length} idx={length} recruiterName={this.state.recruiterName}/>
    )
    this.forceUpdate();
  }

  handleClick(evt, idx) {
    const target = evt.target;
    if (target.classList.contains('remove-job')) {
      this.deleteJobAt(idx)
    }
  }

  render() {

    return (
      <form id='new-company'>
        <div className="form-line">
          <div>
            <label htmlFor="company-name">Company Name </label>
            <input id="company-name" className="form-control" placeholder="Company name" />
          </div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="recruiter-name">Recruiter Name </label>
            <input onBlur={this.saveRecruiterName} id="recruiter-name" className="form-control" placeholder="Recruiter name" />
          </div>
        </div>
        <div id="jobs-forms-container">
          <div className="form-line">
            <div style={{fontSize: '1.2em', fontWeight: 'bold', height: "50%", alignSelf: "flex-end"}}>New Jobs</div>
            <button onClick={this.handleAddNewJob} className="btn btn-default glyphicon glyphicon-plus"></button>
          </div>
          {
            this.state.jobForms.map((form,idx) => (
              <div onClick={evt => this.handleClick(evt, idx)} className="new-job-form-container" key={idx}>
                <div className="job-number">#{idx + 1}</div>
                {form}
              </div>
            ))
          }
        </div>
      </form>
    )
  }
}