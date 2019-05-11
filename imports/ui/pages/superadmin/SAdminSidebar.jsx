/* global $ */

import React, { Component } from 'react';

export default class SAdminSidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <a className="sidebarItem"  href="/sAdmin/dashboard/newRegistrations">
          <i className="sidebarItemIcon far fa-address-book"></i>
          <span className="sidebarItemText">Registraitions</span>
        </a>
        
        <div onClick={() => $(".app").toggleSidebarActive()} className="sidebarToggleBtn">
          <i className="sidebarItemIcon fas fa-arrow-left"></i>
        </div>
        
      </div>
    );
  }
  
  componentDidMount() {
    $(".sidebar").initSidebar();
  }
}