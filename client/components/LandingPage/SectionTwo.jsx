import React from 'react';

export default class SectionTwo extends React.Component {
  constructor(props) {
    super(props);
    this.changeImg = this.changeImg.bind(this);

    this.state = {
      img: props.url || '../../styles/assets/default-thumb.png'
    }
  }

  changeImg() {
    console.log('TODO --- Clicking this will change image shown');
  }

  render() {
    return (
      <div id='second' className='section'>
        <div className='ldg-imgs-container'>
          <div className='ldg-img'>
            <img src={this.state.img}/>
          </div>
          {
            // <img>
          }
          <div onClick={this.changeImg} id='img-nav'>IMG NAV CTRLS</div>
        </div>

        <div className='ldg-blurb-container'>
          <p className='ldg-blurb'>
            Update your existing pipeline easily.
          </p>
        </div>
      </div>
    )
  }
}