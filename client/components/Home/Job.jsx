import React from 'react';


export default class Job extends React.Component {
  constructor(props) {
    super(props)
  }

  formatDate(date) {
    return date.toDateString();
  }

  renderTable() {
    return (
      <tr className="job-component">
        <td></td>
        <td className="status">{this.props.job.status}<div className="td-dividers"></div></td>
        <td className="role">{this.props.job.role}<div className="td-dividers"></div></td>
        <td className="location">{this.props.job.location}<div className="td-dividers"></div></td>
        <td className="recruiter">{this.props.job.recruiter}<div className="td-dividers"></div></td>
        <td className="date_applied">{this.formatDate(this.props.job.date_applied)}</td>
      </tr>
    )
  }

  renderSmall() {
    return (
      <div className="job-component">
        <div className="status"></div>
        <div className="role">{this.props.job.role}</div>
        <div className="location">{this.props.job.location}</div>
        <div className="recruiter">{this.props.job.recruiter}</div>
        <div className="date_applied">{this.formatDate(this.props.job.date_applied)}</div>
      </div>
    )
  }

  render() {
    return this.props.type === 'table' ? 
      this.renderTable() :
      this.renderSmall();
  }
}