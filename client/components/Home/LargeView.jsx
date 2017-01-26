import React from 'react';
import { connect } from 'react-redux';

import actions from '../../redux/actions';


import Job from './Job';
import { Dropdown, sortJobsBy } from '../Utils';
import Summary from './Summary';

class LargeView extends React.Component {
  constructor(props) {
    console.log(props, 'LARGE VIEW')
    super(props);
    this.state = {
      defaultOrder: 'Select order',
      menuItems: ['STATUS', 'ROLE', 'LOCATION', 'RECRUITER', 'DATE APPLIED'],
      open: false,
      jobs: props.data.jobs
    };

    this.handleCompanyNameClicked = this.handleCompanyNameClicked.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
  }

  handleCompanyNameClicked(evt) {
    if (evt.target.classList.value.indexOf('dropdown') > -1) return;

    this.props.dispatch(actions.toggleActiveCompany(this.props.company));
  }

  selectSortOption(evt) {
    const target = evt.target;
    const sorted = sortJobsBy(target.innerText, this.state.jobs);
    this.setState({defaultOrder: target.innerText, jobs: sorted});
  }

  render() {
    const dropdownStyle = {display: (this.props.activeCompanies[this.props.company] ? "flex" : "none")};
    return (
      <div className="company-container">
        <div className="company-number">{this.props.idx + 1}</div>
        <div onClick={this.handleCompanyNameClicked}
          ref={el => this.companyContainer = el}
          className="company-name-container">
          <button ref={el => this.companyName = el} className={"company-name btn btn-default" + " " + (!!this.props.activeCompanies[this.props.company] ? "active" : "")}>
            {this.props.company.toUpperCase()}
            <div className="open-close-help">
              {
                this.props.activeCompanies[this.props.company] ? "Close" : "Open"
              }
            </div>
          </button>
          <div className="company-header-container">
            <div style={dropdownStyle}>
              <Dropdown menuItems={this.state.menuItems} 
              defaultOption={this.state.defaultOrder}
              selectItem={this.selectSortOption} extraClasses={"jobs-order"}/>
            </div>
            <Summary data={this.props.data}/>
          </div>
        </div>
        {
          this.props.activeCompanies[this.props.company] ? 
            <table ref={el => this.table = el} className="company-jobs">
              <thead>
                <tr>
                  <th></th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Recruiter</th>
                  <th>Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.jobs.map((job,idx) => (
                    <Job key={idx} job={job} type={'table'}/>
                  ))
                }
              </tbody>
            </table> : null
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { activeCompanies: state.activeCompanies };
}

export default connect(mapStateToProps)(LargeView);