import React from 'react';

export default class SectionOne extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id='first' className='section'>
        <div className='ldg-blurb-container'>
          <p className='ldg-blurb'>Jobs may not grow on trees. Well, not until you've tried JobTree. <br></br><br></br> Get started today!</p>
          <button className='sign-up btn btn-primary'>Sign Up</button>
        </div>
      </div>
    )
  }
}