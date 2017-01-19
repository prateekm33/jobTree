import React from 'react';

import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.scrollTop = this.scrollTop.bind(this);
  }

  scrollTop() {
    document.body.scrollTop = 0;
  }

  render() {
    return (
      <div id='landing-page-container'>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <div onClick={this.scrollTop} id='scroll-top'>
          <div className="glyphicon glyphicon-chevron-up"></div>
        </div>
      </div>
    )

  }
}