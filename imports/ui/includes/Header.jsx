/* global Router */

import React, { Component } from 'react';

export default class Header extends Component {
 
  render() {
    let navLinks;
    if(Meteor.user() != null) {
      if(Router.current().route.path() == "/") {
        navLinks = (
          <div>
            <div className="link"><a href="/dashboard">Dashboard</a></div>
            <div className="link"><a onClick={Meteor.logout}>Logout</a></div>          
          </div>
        );
      } else {
        navLinks = (
          <div>
            <div className="link"><a onClick={Meteor.logout}>Logout</a></div>            
          </div>
        );
      }
    } else {
      navLinks = (
        <div>
          <div className="link"><a href="/login">Login</a></div>
          <div className="link"><a href="/register">Register</a></div>
        </div>  
      );
    }
    return (
      <div className="navbar">
        <div className="navTitle">
          <a href="/">Worm</a>
        </div>
        <div className="links">
          { navLinks }
        </div>
      </div>
    );
  }
}