import React from 'react'
import { Link } from 'gatsby'

import handleClickAway from '../utils/handleClickAway'

// import github from '../img/github-icon.svg'
// import logo from '../img/logo.svg'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didScroll: false,
      sideNavOpen: false
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }

  handleScroll(){
    // only handle scroll state if menu closed
    if (!this.state.sideNavOpen) {
      if( window.pageYOffset > 50 )
        this.setState({didScroll: true})
      else
        this.setState({didScroll: false})
    }
  }

  closeNav(e) {
      const toggleNode = this.refs.toggle
      const isOutsideClick = handleClickAway(toggleNode, e)
      if (toggleNode && isOutsideClick) {
        this.setState({
          sideNavOpen: false
        })
      }
    }
    handleClick() {
      this.setState({
        sideNavOpen: !this.state.sideNavOpen
      })
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    document.body.addEventListener('click', this.closeNav)
  }

   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll);
     document.body.removeEventListener('click', this.closeNav)
  }

  render() {
    const { sideNavOpen } = this.state
    const mobileNav = (sideNavOpen) ? ' is-active' : ''
   // const openClass = (sideNavOpen) ? ' animate' : ''

    return (
      <nav className={'navbar is-transparent is-fixed-top' + (this.state.didScroll ? ' scrolled' : '') + mobileNav}>
        <div className="container is-widescreen">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              {/* <img src={logo} alt="Kaldi" style={{ width: '88px' }} /> */}
              { "Brian Cruikshank Acro" }
            </Link>
            {/* { console.log(mobileNav) } */}
            <span className={'navbar-burger burger' + mobileNav } role="button" data-target="navMenu" aria-label="menu" aria-expanded="false" onClick={this.handleClick}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </span>
          </div>
          <div className={'navbar-menu ' + mobileNav } id="navMenu">
            <div className="navbar-end">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/photos">
                Photos
              </Link>        
              <Link className="navbar-item" to="/events">
                Events
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>

              {/* <Link className="navbar-item" to="/products">
                Products
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link> */}
            </div>
          </div>

        </div>
      </nav>
    )
  }
}

export default Navbar
