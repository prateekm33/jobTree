import React from 'react';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    this.menuItems = [];

    if (!Array.isArray(props.menuItems)) {
      for (let key in props.menuItems) {
        this.menuItems.push(props.menuItems[key]);
      }
    } else this.menuItems = props.menuItems;
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
            this.menuItems.map((item, idx) => (
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




export class List {
  constructor() {
    this.list = { head: null, tail: null}
    
  }


}