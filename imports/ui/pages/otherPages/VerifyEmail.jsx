import React, { Component } from 'react';

export default class VerifyEmail extends Component {
  
  sendVerificationEmail() {
    Meteor.call("sendVerificationEmail", (err, res) => {
      if(err) {
        alert(err.reason)
      };
    });
  }
  
  render() {
    return (
      <div className="contentContainer">
        <div style={{"maxWidth":"300px"}} className="card blockCenter">
            <h5>Please Verify Your Account</h5>
            <p>Please verify your account. By verifieng your account, you will gain access to all the functionality of this app. (This should be temerary)</p>
            <p>Press the blue button to send a verification email to your account.</p>
            <br/>
            <button onClick={this.sendVerificationEmail} className="btn btn-primary">Verify Your Account</button>
        </div>
      </div>
    );
  }
}