import React, { Component } from 'react';

export default class RegisterSchool extends Component {
    
    changeCType(e) {
        if($("#curriculumType").val() == "Other") {
            $("#otherCurriculumTypeContainer")[0].style.display = "block";
        } else {
            $("#otherCurriculumTypeContainer")[0].style.display = "none";
        }
    }
    
    changeSType(e) {
        if($("#schoolType").val() == "Other") {
            $("#otherSchoolTypeContainer")[0].style.display = "block";
        } else {
            $("#otherSchoolTypeContainer")[0].style.display = "none";
        }
    }
 
    render() {
        return (
            <div>
                <div id="errText" style={{"display":"none"}} className="alert alert-danger" role="alert"></div>
                <div className="container">
                    <form style={{"maxWidth":"500px"}} noValidate="novalidate" id="loginForm" className="formContainer blockCenter" onSubmit={this.submit}>
                        <h5>Register New School Aplication</h5>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-12">
                                <h6>School Information</h6>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="schoolName">School Name</label>
                                <input type="text" className="form-control" id="schoolName" placeholder="Enter the name of your school"/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="password">School Email</label>
                                <input type="password" className="form-control" id="schoolEmail" placeholder="Enter your schools email"/>
                                <small className="form-text text-muted">This will be used as the login email.</small>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="schoolType">School Type</label>
                                <select onChange={this.changeSType} className="form-control" id="schoolType">
                                    <option>Public School</option>
                                    <option>Private School</option>
                                    <option>Independant School</option>
                                    <option>Other</option>
                                </select>
                                <div className="customSpace"/>
                                <div style={{"display":"none"}} id="otherSchoolTypeContainer">
                                    <label htmlFor="otherSchoolType">Other School Type</label>
                                    <input type="password" className="form-control" id="otherSchoolType" placeholder="Enter your school type"/>
                                </div>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="curriculumType">Curriculum Type</label>
                                <select onChange={this.changeCType} className="form-control" id="curriculumType">
                                    <option>K12</option>
                                    <option>CIE</option>
                                    <option>IB</option>
                                    <option>Other</option>
                                </select>
                                <div className="customSpace"/>
                                <div style={{"display":"none"}} id="otherCurriculumTypeContainer">
                                    <label htmlFor="otherCurriculumType">Other Curriculum Type</label>
                                    <input type="text" className="form-control" id="otherCurriculumType" placeholder="Enter Your Curriculum Type"/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-12">
                                <h6>School Admin Info</h6>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary" id="registerBtn">Register New School</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}