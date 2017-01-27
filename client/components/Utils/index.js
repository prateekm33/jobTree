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

const statuses = {'OFFER':0, 'APPLIED': 1, 'PHONE-SCREEN': 2, 'ON-SITE':3, 'REJECTED':4};

export const sortJobsBy = (option, jobs) => {
  const temp = jobs.map(i => i);

  switch (option) {
    case 'STATUS':
      return temp.sort((a,b) => statuses[a.status] > statuses[b.status]);
    case 'ROLE':
      return temp.sort((a,b) => a.role > b.role);
    case 'LOCATION':
      return temp.sort((a,b) => a.location > b.location);
    case 'RECRUITER':
      return temp.sort((a,b) => a.recruiter > b.recruiter);
    case 'DATE APPLIED':
      return temp.sort((a,b) => a.date_applied > b.date_applied);
    default: return jobs;
  }
}


export const validateForm = (form) => {
  const inputs = Array.prototype.slice.call(form.querySelectorAll('input'));

  let hasAtLeastOneJob = false;
  const response = {valid: true, inputs: []};

  for (let i = 0; i < inputs.length; i++) {
    if (!inputValidated(inputs[i])) {
      response.valid = false;
      response.inputs.push(inputs[i]);
    }
    if (inputs[i].id === 'role-name') hasAtLeastOneJob = true;
  }

  if (!hasAtLeastOneJob) {
    response.valid = false;
    response.msg = 'Please enter at least one role that you have applied to';
    return response;
  }

  if (response.valid) response.inputs = inputs;
  return response;
}

function inputValidated(input) {
  switch (input.id) {
    case 'company-name':
      return !!input.value;
    case 'role-name':
      return !!input.value;
    case 'location-name':
      return !!input.value;
    case 'date-applied':
      return !!input.value;
    default: return true;
  }
}


export const validateAuthForm = (form) => {
  const inputs = Array.prototype.slice.call(form.querySelectorAll('input'));
  const response = {valid: true, inputs: [], msg: ''};

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      response.valid = false;
      response.inputs.push(inputs[i]);
      response.msg = 'Please fill out the required fields';
    }
  }
  if (form.id === 'signup-form') {
    const pws = inputs.filter(i => i.type === 'password');


    const pwsMatch = pws.reduce((a,b) => a.value === b.value);
    if (!pwsMatch) {
      response.msg += '***Passwords do not match';
      response.valid = false;
      response.inputs.push(...pws);
    }
  }

  if (response.valid) response.inputs = inputs;
  return response;
}

