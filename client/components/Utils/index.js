import React from 'react';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  toggleDropDownMenu() {
    const currDisplay = window.getComputedStyle(this.dropdownMenu).display;
    if (currDisplay === 'none') this.dropdownMenu.style.display = 'flex';
    else this.dropdownMenu.style.display = 'none';
  }

  handleItemClick(evt) {
    const target = evt.target;
    if (target.tagName !== 'LI') return;

    this.toggleDropDownMenu();
    this.props.selectItem(evt)
  }

  render() {
    return (
      <div id={this.props.id || ''} className={"order-options dropdown" + " " + (this.props.extraClasses ||'')}>
        <div>Order By: </div>
        <button onClick={this.toggleDropDownMenu} className="btn btn-default dropdown-toggle">
          {this.props.defaultOption.toUpperCase()}
        </button>
        <ul onClick={this.handleItemClick} ref={el => this.dropdownMenu = el} className='dropdown-menu'>
          {
            this.props.menuItems.map((item, idx) => (
              <li key={idx} className="dropdown-item">
                { item }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}