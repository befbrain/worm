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
                }
            });
        }
    }
 
    render() {
        return (
            <div className="contentContainer">
                <div style={{"maxWidth":"240px"}} className="card blockCenter">
                    <form noValidate="novalidate" id="loginForm" onSubmit={this.submit}>
                        <h3 className="pad-5">Login</h3>
                        <p id="errText" className="pad-5 errText" style={{"marginBottom":"10px", "display":"none"}}></p>
                        <div className="inputGroup">
                            <label htmlFor="emailOrUsername">Email/Username</label>
                            <input type="text" id="emailOrUsername" placeholder="Enter you email or username"/>
                        </div>
                        <div className="pad-5 inputGroup">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password"/>
                        </div>
                        <div className="pad-5 inputGroup">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <p className="pad-5">Don't have an account? <a href="/register">Register</a>.</p>
                    </form>
                </div>
            </div>
        );
    }
}