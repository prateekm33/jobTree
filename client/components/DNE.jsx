import React from 'react';
import Snakes from './Snakes';

export default class DNE extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id='dne-page-container'> 
        <div className="quote">
          "Even the path that does not go anywhere, will lead you to somewhere"
        </div>

        <div id='snakes-title'>
          <div>Although you were not able to find the page that you are looking for, you stumbled across a hidden gem.</div>
          <div id='center'>A wild Snakes game appears!</div>
        </div>
        <Snakes />
      </div>
    )
  }
}