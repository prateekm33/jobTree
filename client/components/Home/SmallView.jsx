import React from 'react';
import { connect } from 'react-redux';

import actions from '../../redux/actions';

import Job from './Job';
import Summary from './Summary';

class SmallView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.toggleJobs = this.toggleJobs.bind(this);
  }

  toggleJobs(evt) {
    evt.preventDefault();
    this.toggleButton.classList.toggle('active');
    this.props.dispatch(actions.toggleActiveCompany(this.props.company));
  }

  render() {
    return (
      <div ref={this.props.refFn} className="company-container">
        <div className="company-number">{this.props.idx + 1}</div>
        <button ref={el => this.toggleButton = el} onClick={this.toggleJobs} className={"company-name btn btn-default" + " " + (!!this.props.activeCompanies[this.props.company] ? "active" : "")}>
          {this.props.company}
          <div>{!!this.props.activeCompanies[this.props.company] ? "Close" : "Click to view jobs"}</div>
          <Summary data={this.props.data} />
        </button>
        {
          this.props.activeCompanies[this.props.company] ? <div ref={el => this.jobsContainer = el} className="sv-company-jobs-container">
            {
              this.props.data.jobs.map((job,idx) => (
                <Job key={idx} job={job} type="small"/>
              ))
            }
          </div> : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { activeCompanies: state.activeCompanies };
}

export default connect(mapStateToProps)(SmallView);