/* global $ */

import React, { Component } from 'react';
import validateEmail from '/imports/startup/both/gFuncs.js';

export default class SchoolRegister extends Component {
    
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    
    changeCType() {
        if($("#curriculumType").val() == "Other") {
            $("#otherCurriculumTypeContainer")[0].style.display = "block";
        } else {
            $("#otherCurriculumTypeContainer")[0].style.display = "none";
        }
    }
    
    changeSType() {
        if($("#schoolType").val() == "Other") {
            $("#otherSchoolTypeContainer")[0].style.display = "block";
        } else {
            $("#otherSchoolTypeContainer")[0].style.display = "none";
        }
    }
    
    submit(e) {
        e.preventDefault();
        
        let showErrMessage = function(errMsg) {
            $("#errText")[0].style.display = "block";
            $("#errText")[0].innerHTML = errMsg;
        };
        
        let errMsg = null;
        
        if($("#schoolName").val() == "") {
            errMsg = "You must enter your school's name.";
        } else if($("#schoolEmail").val() == "") {
            errMsg = "You must enter your school's email.";
        } else if($("#curriculumType").val() == "Other" && $("#otherCurriculumType").val() == "") {
            errMsg = "Enter the type of your curriculum.";
        } else if($("#schoolType").val() == "Other" && $("#otherSchoolType").val() == "") {
            errMsg = "Enter the type of your school.";
        } else if($("#password").val() == "") {
            errMsg = "You must enter your a password";
        } else if($("#confirmPassword").val() == "") {
            errMsg = "You must confirm your password.";
        } else if($("#confirmPassword").val() != $("#password").val()) {
            errMsg = "You passwords do not match.";
        } else if(!validateEmail($("#schoolEmail").val())) {
            errMsg = "Your email is not valid.";
        }
        
        if(errMsg != null) {
            showErrMessage(errMsg);
        } else {
            let options = {
                schoolEmail:$("#schoolEmail").val(),
                schoolName:$("#schoolName").val(),
                curriculumType:($("#curriculumType").val() == "Other") ? $("#otherCurriculumType").val() : $("#curriculumType").val(),
                schoolType:($("#schoolType").val() == "Other") ? $("#otherSchoolType").val() : $("#schoolType").val()
            };
            
            Accounts.createUser({
                "password":$("#password").val(),
                "email":options.schoolEmail
            });
            
            Meteor.call("createNewSchool", options, (err, res) => {
                if(err) {
                    alert(err.reason);
                }
            });
        }
    }
 
    render() {
        return (
            <div className="contentContainer">
                <div style={{"maxWidth":"500px"}} className="card blockCenter">
                    <form onSubmit={this.submit} noValidate="novalidate" id="loginForm" onSubmit={this.submit}>
                        <h3 className="pad-5">Register New School</h3>
                        <div className="row">
                            <div className="pad-5">
                                <h4>School Information</h4>
                            </div>
                            <p id="errText" className="pad-5 errText" style={{"marginBottom":"10px", "display":"none"}}></p>
                            <div className="col inputGroup" col-xs="12" col-sm="6">
                                <label htmlFor="schoolName">School Name</label>
                                <input type="text" id="schoolName" placeholder="Enter the name of your school"/>
                            </div>
                            <div className="col inputGroup" col-xs="12" col-sm="6">
                                <label htmlFor="schoolEmail">School Email</label>
                                <input type="text" className="form-control" id="schoolEmail" placeholder="Enter your schools email"/>
                            </div>
                            <div className="col inputGroup" col-xs="12" col-sm="6">
                                <label htmlFor="schoolType">School Type</label>
                                <select onChange={this.changeSType} className="form-control" id="schoolType">
                                    <option>Public School</option>
                                    <option>Private School</option>
                                    <option>Independant School</option>
                                    <option>Other</option>
                                </select>
                                <div style={{"marginBottom":"25px", "height":"0px", "width":"100%"}}/>
                                <div className="inputGroup" style={{"display":"none"}} id="otherSchoolTypeContainer">
                                    <label htmlFor="otherSchoolType">Other School Type</label>
                                    <input type="password" className="form-control" id="otherSchoolType" placeholder="Enter your school type"/>
                                </div>
                            </div>
                            <div className="col inputGroup" col-xs="12" col-sm="6">
                                <label htmlFor="curriculumType">Curriculum Type</label>
                                <select onChange={this.changeCType} className="form-control" id="curriculumType">
                                    <option>K12</option>
                                    <option>CIE</option>
                                    <option>IB</option>
                                    <option>Other</option>
                                </select>
                                <div style={{"marginBottom":"25px", "height":"0px", "width":"100%"}}/>
                                <div className="inputGroup" style={{"display":"none"}} id="otherCurriculumTypeContainer">
                                    <label htmlFor="otherCurriculumType">Other Curriculum Type</label>
                                    <input type="text" className="form-control" id="otherCurriculumType" placeholder="Enter Your Curriculum Type"/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col pad-5" col-xs="12">
                                <h4>School Admin Info</h4>
                            </div>
                            <div className="col inputGroup" col-xs="12">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password"/>
                            </div>
                            <div className="col inputGroup" col-xs="12">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm your password"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="inputGroup">
                                <button type="submit" className="btn btn-primary" id="registerBtn">Register New School</button>
                            </div>
                        </div>
                        <p className="pad-5">Already have an account? <a href="/login">Login</a>.</p>
                    </form>
                </div>
            </div>
        );
    }
}
