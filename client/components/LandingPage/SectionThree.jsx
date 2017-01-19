import React from 'react';

export default class SectionThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: props.url || '../../styles/assets/default-thumb.png'
    }
  }

  render() {
    return (
      <div id='third' className='section'>
        <div className='ldg-blurb-container'>
          <p className='ldg-blurb'>
            Use the analytics to track your progress over time and gain useful insights. 
          </p>
        </div>

        <div className='ldg-imgs-container'>
          <div className='ldg-img'>
            <img src={this.state.img}/>
          </div>
        </div>
      </div>
    )
  }
}