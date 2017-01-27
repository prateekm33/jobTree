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

  scrollTop() {
    window.alert(setTimeout + ' ---' + window.setTimeout);
    // if (window.mobilecheck()) {
    //   document.body.scrollTop = 0;
    //   return;
    // } 


    const body = document.body;
    const initTop = body.scrollTop;
    const start = Date.now();
    const end = start + 2000;
    const distance = -initTop;
    let prevTop = body.scrollTop;

    const scrollHelper = () => {
      const currTop = body.scrollTop;
      window.alert('RUNNING SCROLL TOP', currTop);
      if (prevTop !== currTop) return;


      const now = Date.now();
      const next = this.getSmoothStep(start, end, now);
      const nextTop = Math.round(initTop + (distance * next));
      body.scrollTop = nextTop;

      if (now >= end) return;
      prevTop = body.scrollTop;

      setTimeout(scrollHelper, 0);
    }
    scrollHelper();
  }

  getSmoothStep(start, end, curr) {
    if(curr <= start) { return 0; }
    if(curr >= end) { return 1; }
    let x = (curr - start) / (end - start);
    return x*x*(5 + 3*x);
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