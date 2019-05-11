import { Roles } from 'meteor/alanning:roles';

import { Schools } from './schools.js';

Meteor.publish('unVerifiedSchools', function tasksPublication() {
    if(Roles.userIsInRole(this.userId, ['superadmin'])) {
        return Schools.find({"verified":false})
    }
});