import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';



class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const thirdGroup = this.props.user ? [{link: '/faq', title: 'FAQ'}, {link: '/careers', title: 'Careers'}] : [{link: '/faq', title: 'FAQ'}, {link: '/careers', title: 'Careers'}, {link: '/signup', title: 'Sign Up'}, {link: '/login', title: 'Log In'}]

    return (
      <nav id='footer'>
        <div id='nav-options'>
          <FooterComp title="Learn More" links={[{link: '/about', title: 'About'}, {link: '/blog', title: 'Blog'}]}/>
          <FooterComp title="Connect" links={[{link: '/contact', title: 'Contact'}, {link: '/twitter', title: 'Twitter'}, {link: '/facebook', title: 'Facebook'}]}/>
          <FooterComp title="Links" links={thirdGroup}/>
        </div>
      </nav>
    )
  }
}


class FooterComp extends React.Component {
  constructor(props) { 
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown(evt) {
    const target = evt.target;
    if (!target.classList.contains('footer-component-title')) return;
    const curr = window.getComputedStyle(this.body).display;
    if (curr === 'none') this.body.style.display = 'flex';
    else this.body.style.display = 'none';
  }

  render() {
    return (
      <div onClick={this.toggleDropDown} className="footer-component">
        <div className="footer-component-title">{this.props.title}</div>
        <div ref={el => this.body = el } className="footer-component-body">
          {
            this.props.links.map((link, idx) => (
              <Link to={link.link} key={idx}>{link.title}</Link>
            ))
          }
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps)(Footer);