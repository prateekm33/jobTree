import React from 'react';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  toggleDropDownMenu(evt) {
    evt.preventDefault();

    const currDisplay = window.getComputedStyle(this.dropdownMenu).display;
    if (currDisplay === 'none') this.dropdownMenu.style.display = 'flex';
    else this.dropdownMenu.style.display = 'none';
  }

  handleItemClick(evt) {
    evt.preventDefault();
    const target = evt.target;
    if (target.tagName !== 'LI') return;

    this.toggleDropDownMenu(evt);
    this.props.selectItem(evt)
  }

  render() {
    const itemClasses = this.props.itemClasses || {};
    let message = this.props.message || "Order By:";
    if (message.substr(-1) !== ':') message += ':'
    return (
      <div id={this.props.id || ''} className={"order-options dropdown" + " " + (this.props.extraClasses ||'')}>
        <div>{message}</div>
        <button onClick={this.toggleDropDownMenu} className={"btn btn-default dropdown-toggle" + " " + (itemClasses[this.props.defaultOption] || "")} >
          {this.props.defaultOption.toUpperCase()}
        </button>
        <ul onClick={this.handleItemClick} ref={el => this.dropdownMenu = el} className='dropdown-menu'>
          {
            this.props.menuItems.map((item, idx) => (
              <li key={idx} id={item} className={"dropdown-item" + " " +(itemClasses[item] || '')}>
                { item }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}