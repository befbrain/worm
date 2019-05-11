import { Meteor } from 'meteor/meteor';

Meteor.methods({
    "sendVerificationEmail":function() {
        if(this.userId != null) {
            Accounts.sendVerificationEmail(Meteor.userId());
        } else {
            throw new Meteor.Error("userNotLoggedIn", "The user is not logged in.");
        }
    }
});