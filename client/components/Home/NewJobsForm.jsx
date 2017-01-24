import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { Dropdown } from '../Utils';

class NewJobsForm extends React.Component {
  constructor(props) {
    super(props);

    this.selectStatus = this.selectStatus.bind(this);
    this.updateJobProps = this.updateJobProps.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
    this.state = {
      defaultStatus: 'APPLIED',
      menuItems: [
        'APPLIED', 
        'PHONE-SCREEN',
        'ON-SITE',
        'OFFER',
        'REJECTED'
      ],

      itemClasses: {
        'APPLIED': 'applied status-bar',
        'PHONE-SCREEN': "phone-screen status-bar",
        'ON-SITE': "on-site status-bar",
        'REJECTED': "rejected status-bar",
        'OFFER' : "offer status-bar"
      }
    }
  }

  componentDidMount() {
    this.recruiterInput.value = this.props.recruiterName;
    this.props.job.recruiter = this.props.recruiterName;
    if (this.props.company) this.roleEl.focus();
  }

  componentDidUpdate() {
    this.props.job.recruiter = this.props.job.recruiter || this.recruiterInput.value || this.props.recruiterName;

    this.roleEl.value = this.props.job.role;
    this.locationEl.value = this.props.job.location;
    this.dateAppliedEl.value = this.props.job.date_applied;
    this.recruiterInput.value = this.props.job.recruiter;
  }

  selectStatus(evt) {
    const status = evt.target.innerText;
    this.props.job.status = status;
    this.setState({defaultStatus: status});
  }

  updateJobProps(evt) {
    const target = evt.target;
    if (target.value) target.style.border = '';

    switch (target.id) {
      case 'status-name':
        this.props.job.status = target.value;
        return;
      case 'role-name':
        this.props.job.role = target.value;
        return;
      case 'location-name':
        this.props.job.location = target.value;
        return;
      case 'recruiter-name':
        this.props.job.recruiter = target.value;
        return;
      case 'date-applied':
        this.props.job.date_applied = target.value;
        return;
      default: return;
    }
  }

  handleDelete() {
    this.props.dispatch(actions.removeJobAt(this.props.idx));
  }

  render() {
    return (
      <div className="new-job">
        <div onClick={this.handleDelete} className="remove-job glyphicon glyphicon-remove"></div>
        <div className="job-number">#{this.props.idx + 1}</div>
        <div className="form-line">
          <div>
            <label htmlFor="role-name">Role</label>
            <input onBlur={this.updateJobProps} ref={el => this.roleEl = el} id="role-name" className="form-control" placeholder="Role"/>
          </div> 
          <Dropdown defaultOption={this.props.job.status || this.state.defaultStatus} selectItem={this.selectStatus} id={'status-dd-job-form'} extraClasses={'status-dropdown'} itemClasses={this.state.itemClasses} menuItems={this.state.menuItems} message={"Status"} />
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="location-name">Location</label>
            <input onBlur={this.updateJobProps} ref={el => this.locationEl = el} id="location-name" className="form-control" placeholder="Location"/>
          </div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="recruiter-name">Recruiter Name </label>
            <input onBlur={this.updateJobProps} ref={el => this.recruiterInput = el} id="recruiter-name" className="form-control" placeholder="Recruiter"/>
          </div>
        </div>
        <div className="form-line"> 
          <div>
            <label htmlFor="date-applied">Date Applied </label>
            <input onBlur={this.updateJobProps} ref={el => this.dateAppliedEl = el} id="date-applied" className="form-control" placeholder="Date Applied"/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(NewJobsForm)