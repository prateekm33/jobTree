import React from 'react';

import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.scrollTop = this.scrollTop.bind(this);
    this.displayScrollTop = this.displayScrollTop.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.displayScrollTop)
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.displayScrollTop)
  }

  displayScrollTop() {
    if (document.body.scrollTop > 300) {
      this.scrollTopDiv.style.visibility = 'visible';
      this.scrollTopDiv.style.opacity = '1';
    }
    else {
      this.scrollTopDiv.style.visibility = 'hidden';
      this.scrollTopDiv.style.opacity = '0';
    }
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
        <div ref={el => this.scrollTopDiv = el} onClick={this.scrollTop} id='scroll-top'>
          <div className="glyphicon glyphicon-chevron-up"></div>
        </div>
      </div>
    )

  }
}