import React, { Component } from 'react';

export default class Header extends Component {
 
  render() {
    let navBtns;
    if(Meteor.user() == null) {
        navBtns = ( 
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
            </ul>
        );
    } else {
        navBtns = ( 
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" onClick={ Meteor.logout }>Logout</a>
                </li>
            </ul>
        );
    }
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <a className="navbar-brand" href="/">Worm</a>
            <div className="navbar-links" id="navbarNav">
                { navBtns }
            </div>
        </nav>
    );
  }
}