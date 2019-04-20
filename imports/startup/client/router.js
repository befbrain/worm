import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router'

import App from '/imports/ui/pages/App.jsx'
import Login from '/imports/ui/pages/Login.jsx'
import Header from '/imports/ui/includes/Header.jsx'

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