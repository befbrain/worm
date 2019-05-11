import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

if(Meteor.users.find().count() === 0) {
    console.log("Creating Default User");
    Meteor.settings.defaultUsers.forEach((user) => {
        let newUserId = Accounts.createUser({
            "password":user.password,
            "email":user.email
        });
        
        Roles.addUsersToRoles(newUserId, ['superadmin']);
    });
} else {
    console.log("Users Already Found");
}
