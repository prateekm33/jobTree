import React from 'react';

import { Dropdown } from '../Utils';

export default class NewJobsForm extends React.Component {
  constructor(props) {
    super(props);

    this.selectStatus = this.selectStatus.bind(this);

    this.state = {
      defaultStatus: 'APPLIED',
      menuItems: [
        'APPLIED', 
        'PHONE-SCREEN',
        'ON-SITE',
        'REJECTED',
        'OFFER'
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

  componentDidUpdate() {
    this.recruiterInput.value = this.recruiterInput.value || this.props.recruiterName;
  }

  selectStatus(evt) {
    const status = evt.target.innerText;
    this.setState({defaultStatus: status});
  }

  render() {
    return (
      <div className="new-job">
        <div className="remove-job glyphicon glyphicon-remove"></div>
        <div className="form-line">
          <div>
            <label htmlFor="status-name">Status</label>
            <input ref={el => this.statusEl = el} id="status-name" className="form-control" placeholder="Status"/>
          </div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="role-name">Role</label>
            <input ref={el => this.roleEl = el} id="role-name" className="form-control" placeholder="Role"/>
          </div> 
          <Dropdown defaultOption={this.state.defaultStatus} selectItem={this.selectStatus} id={'status-dd-job-form'} extraClasses={'status-dropdown'} itemClasses={this.state.itemClasses} menuItems={this.state.menuItems} message={"Status"} />
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="location-name">Location</label>
            <input ref={el => this.locationEl = el} id="location-name" className="form-control" placeholder="Location"/>
          </div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="recruiter-name">Recruiter Name </label>
            <input ref={el => this.recruiterInput = el} id="recruiter-name" className="form-control" placeholder="Recruiter"/>
          </div>
        </div>
        <div className="form-line"> 
          <div>
            <label htmlFor="date-applied">Date Applied </label>
            <input ref={el => this.dateAppliedEl = el} id="date-applied" className="form-control" placeholder="Date Applied"/>
          </div>
        </div>
      </div>
    )
  }
}