import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import NewJobsForm from './NewJobsForm';

class NewCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.saveRecruiterName = this.saveRecruiterName.bind(this);
    this.handleAddNewJob = this.handleAddNewJob.bind(this);

    this.state = {
      recruiterName: '',
      deleteIdx: +Infinity,
      jobForms: []
    }
  }

  componentWillMount() {
    this.props.dispatch(actions.resetCompanyForm());
  }
  componentDidMount() {
    this.companyNameInput.focus();
  }

  saveRecruiterName(evt) {
    this.setState({recruiterName: evt.target.value});
  }

  handleAddNewJob(evt) {
    evt.preventDefault();
    this.props.dispatch(actions.createNewJob())
  }

  render() {

    return (
      <form id='new-company'>
        <div className="form-title">New Company Form</div>
        <div className="form-line">
          <div>
            <label htmlFor="company-name">Company Name </label>
            <input ref={el => this.companyNameInput = el} id="company-name" className="form-control" placeholder="Company name" />
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
            this.props.newJobsData.reduceRight((arr,job,idx) => {
              arr.push(<NewJobsForm recruiterName={this.state.recruiterName} company={this.companyNameInput.value} job={job} key={idx} idx={idx} />)
              return arr;
              }, [])
          }
        </div>
      </form>
    )
  }
}


function mapStateToProps(state) {
  return { newJobsData: state.newJobsData }
}

export default connect(mapStateToProps)(NewCompanyForm);