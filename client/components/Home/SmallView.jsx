import React from 'react';

import Job from './Job';

export default class SmallView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div ref={this.props.refFn} className="company-container">
        <button className="company-name btn btn-default">
          {this.props.company}
          <div>Click to view jobs</div>
        </button>
      </div>
    )
  }
}