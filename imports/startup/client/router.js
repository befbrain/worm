import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Roles } from 'meteor/alanning:roles';
import { Router } from 'meteor/iron:router';

import Home from '/imports/ui/pages/Home.jsx';
import Login from '/imports/ui/pages/Login.jsx';
import Header from '/imports/ui/includes/Header.jsx';
import SAdminDashboard from '/imports/ui/pages/superadmin/SAdminDashboard.jsx';


Router.route('/', function () {
    render(<Header />, document.getElementById('top-target'));
    render(<Home />, document.getElementById('react-target'));
});

Router.route('/login', function () {
    render(<Header />, document.getElementById('top-target'));
    if(Meteor.userId() == null) {
        render(<Login />, document.getElementById('react-target'));
    } else {
        Router.go("/dashboard");
    }
});

Router.route('/dashboard', function () {
    if(Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
        Router.go("/sAdmin/dashboard");
    }
});

Router.route('/sAdmin/dashboard', function () {
    render(<Header />, document.getElementById('top-target'));
    if(Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
        render(<SAdminDashboard />, document.getElementById('react-target'));
    }
});

// FlowRouter.route('/dashboard', {
//     action: function(params) {
//         render(<Header />, document.getElementById('top-target'));
        
//         if(Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
//             console.log("test")
//             render(<Dashboard />, document.getElementById('react-target'));
//         }
//     }
// });