import React, { Component } from 'react';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    submit(e){
        e.preventDefault();
        
        let showErrMessage = function(errMsg) {
            $("#errText")[0].style.display = "block";
            $("#errText")[0].innerHTML = errMsg;
        };
        
        /*global $*/
        let user = $("#emailOrUsername").val();
        let password = $("#password").val();
        
        if(user == "") {
            showErrMessage("You must type your email or username.");
        } else if (password == "") {
            showErrMessage("You must type your password.");
        } else {
            Meteor.loginWithPassword(user, password, (err, res) => {
                if(err != null) {
                    showErrMessage("Incorrect username or password.");
                } else {
                    alert("You are logged in!");
                }
            });
        }
    }
 
    render() {
        return (
            <div>
                <div id="errText" style={{"display":"none"}} className="alert alert-danger" role="alert"></div>
                <div className="container">
                    <form style={{"max-width":"240px"}} noValidate="novalidate" id="loginForm" className="formContainer blockCenter" onSubmit={this.submit}>
                        <h5>Login</h5>
                        <div className="form-group">
                            <label htmlFor="emailOrUsername">Email/Username</label>
                            <input type="text" className="form-control" id="emailOrUsername" placeholder="Enter you email or username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}