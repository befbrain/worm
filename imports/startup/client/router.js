import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { render } from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router'

import App from '/imports/ui/pages/App.jsx'
import Login from '/imports/ui/pages/Login.jsx'
import Header from '/imports/ui/includes/Header.jsx'

Tracker.autorun(function() {
  FlowRouter.watchPathChange();
  var currentContext = FlowRouter.current();
  
  if(FlowRouter._current.path == "/login") {
    if(Meteor.user() != null) {
        FlowRouter.go("/dashboard")
    }
  } else if(FlowRouter._current.path == "/dashboard") {
    if(Meteor.user() == null) {
        FlowRouter.go("/login")
    }
  }
});

FlowRouter.route('/', {
    action: function(params) {
        render(<Header />, document.getElementById('top-target'));
        render(<App />, document.getElementById('react-target'));
    }
});

FlowRouter.route('/login', {
    action: function(params) {
        render(<Header />, document.getElementById('top-target'));
        render(<Login />, document.getElementById('react-target'));
    }
});

FlowRouter.route('/dashboard', {
    action: function(params) {
        render(<Header />, document.getElementById('top-target'));
        render(<Login />, document.getElementById('react-target'));
    }
});