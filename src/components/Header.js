import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Navbar} from 'react-bootstrap'

class Header extends Component{
  render() {
    return (
    <Navbar id="navBar">
      <h4 className="mr-auto" id='navHeader'>FlatNote</h4>
      {this.props.currentUser ? 
      <div id="navButtons" className="ml-auto">
          <NavLink to="/new" id="headerLink" activeStyle={{'text-decoration': 'underline'}}>New Note</NavLink>/
          <NavLink to="/notes" id="headerLink" activeStyle={{'text-decoration': 'underline'}}>My Notes</NavLink>/
          <NavLink to="/messages" id="headerLink" activeStyle={{'text-decoration': 'underline'}}>Notes From Friends</NavLink>/
          <NavLink to="/login" id="headerLink" onClick={this.props.signOut} activeStyle={{'text-decoration': 'underline'}}>Sign Out</NavLink>
      </div>: null}
    </Navbar>
  )
}
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};
 
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch({type: "SIGN_OUT"})
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);