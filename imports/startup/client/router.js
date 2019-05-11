/* global $ */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM, { render } from 'react-dom';
import { Roles } from 'meteor/alanning:roles';
import { Router } from 'meteor/iron:router';

import Home from '/imports/ui/pages/Home.jsx';
import Login from '/imports/ui/pages/Login.jsx';
import Header from '/imports/ui/includes/Header.jsx';

import SAdminMain from '/imports/ui/pages/superadmin/SAdminMain.jsx';
import SAdminSidebar from '/imports/ui/pages/superadmin/SAdminSidebar.jsx';
import NewRegistrationsContainer from '/imports/ui/pages/superadmin/NewRegistrations.jsx'

import SchoolRegister from '/imports/ui/pages/SchoolRegister.jsx';
import VerifyEmail from '/imports/ui/pages/otherPages/VerifyEmail.jsx';
import SchoolDashboard from '/imports/ui/pages/school/SchoolDashboard.jsx';


import { Schools } from "/imports/api/schools/schools.js";
Meteor.subscribe("unVerifiedSchools")

Accounts.onEmailVerificationLink(function(token, done) {
    Accounts.verifyEmail(token);
});

let removeSidebar = function() {
    $(".app").toggleSidebarHidden(true);
    ReactDOM.unmountComponentAtNode(document.getElementById('sidebar-target'));
};

let showSidebar = function() {
    $(".app").toggleSidebarHidden(false);
    $(".app").toggleSidebarActive(Session.get("isSidebarActive"));
};

Router.route('/', function () {
    removeSidebar();
    render(<Header />, document.getElementById('top-target'));
    render(<Home />, document.getElementById('main-target'));
});

Router.route('/login', function () {
    removeSidebar();
    render(<Header />, document.getElementById('top-target'));
    if(Meteor.user() == null) {
        render(<Login />, document.getElementById('main-target'));
    } else {
        Router.go("/dashboard");
    }
});
Router.route('/register', function () {
    removeSidebar();
    render(<Header />, document.getElementById('top-target'));
    if(Meteor.user() == null) {
        render(<SchoolRegister />, document.getElementById('main-target'));
    } else {
        Router.go("/dashboard");
    }
});
Router.route('/dashboard', function () {
    if(Meteor.user() != null) {
        if(Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
            Router.go("/sAdmin/dashboard", { page:"main" });
        } else if(Roles.userIsInRole(Meteor.userId(), ['school_admin'])) {
            Router.go("/school/dashboard");
        }
    } else {
        Router.go("/login");
    }
    
});

Router.route('/sAdmin/dashboard', function () {
    render(<Header />, document.getElementById('top-target'));
    if(Meteor.user() != null) {
        if(Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
            if(Meteor.user().emails[0].verified) {
                showSidebar();
                render(<SAdminMain />, document.getElementById('main-target'));
                render(<SAdminSidebar />, document.getElementById('sidebar-target'));
            } else {
                removeSidebar();
                render(<VerifyEmail/>, document.getElementById('main-target'));
            }
        }
    } else {
        Router.go("/login");
    }
    
});
Router.route('/sAdmin/dashboard/newRegistrations', function () {
    render(<Header />, document.getElementById('top-target'));
    if(Meteor.user() != null) {
        if(Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
            if(Meteor.user().emails[0].verified) {
                showSidebar();
                render(<NewRegistrationsContainer />, document.getElementById('main-target'));
                render(<SAdminSidebar />, document.getElementById('sidebar-target'));
            } else {
                removeSidebar();
                render(<VerifyEmail/>, document.getElementById('main-target'));
            }
        }
    } else {
        Router.go("/login");
    }
    
});

Router.route('/school/dashboard', function () {
    showSidebar();
    render(<Header />, document.getElementById('top-target'));
    if(Meteor.user() != null) {
        if(Roles.userIsInRole(Meteor.userId(), ['school_admin'])) {
            if(Meteor.user().emails[0].verified) {
                render(<SchoolDashboard />, document.getElementById('react-target'));
            } else {
                render(<VerifyEmail/>, document.getElementById('react-target'));
            }
        }
    } else {
        Router.go("/login");
    }
    
});