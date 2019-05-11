/* global Roles */

import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { check } from 'meteor/check';

import { Schools } from './schools.js';

import validateEmail from '/imports/startup/both/gFuncs.js';

Meteor.methods({
    "createNewSchool":function(options) {
        check(options, {
            schoolEmail:String,
            schoolName:String,
            curriculumType:String,
            schoolType:String
        });
        
        if(!validateEmail(options.schoolEmail)) {
            throw new Meteor.Error("invalidEmail", "Your email was invalid. Please enter a valid email.");
        } else {
            console.log(this.userId)
            if(this.userId != null) {
                Schools.insert({
                    "schoolAdminId":this.userId,
                    "schoolEmail":options.schoolEmail,
                    "schoolName":options.schoolName,
                    "curriculumType":options.curriculumType,
                    "schoolType":options.schoolType,
                    "verified":false,
                    "timeCreated":new Date(),
                    "timeVerified":null,
                    "banned":false,
                    "options": {
                    
                    },
                    "info": {
                    
                    }
                });
            } else {
                throw new Meteor.Error("noAuthorizedUser", "No authorized user was detected.")
            }
            
        }
        
        console.log(Schools.find().fetch())
    },
    
    "aproveSchool": function(schoolId) {
        if(Roles.userIsInRole(this.userId, ['superadmin'])) {
            console.log(schoolId)
            Schools.update(schoolId, {
                $set: { verified: true }
            });
        } else {
            throw new Meteor.Error("userNotAuthorized", "This user is not authorized to perform this action.")
        }
    },
});

const createNewSchoolRule = {
  type: 'method',
  name: 'createNewSchool'
};

DDPRateLimiter.addRule(createNewSchoolRule, 1, 1000);