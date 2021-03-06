import React from 'react';

import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

import { scrollTop } from '../Utils';

export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.displayScrollTop = this.displayScrollTop.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.displayScrollTop)
  }

  componentWillUnmount() {
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

  render() {
    return (
      <div id='landing-page-container'>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <div ref={el => this.scrollTopDiv = el} onClick={scrollTop} id='scroll-top'>
          <div className="glyphicon glyphicon-chevron-up"></div>
        </div>
      </div>
    )

  }
}