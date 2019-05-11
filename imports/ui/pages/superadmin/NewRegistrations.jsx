import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Schools } from '/imports/api/schools/schools.js';

class NewRegistrations extends Component {
  constructor(props) {
    super(props)
    this.render = this.render.bind(this);
  }
  
  aproveSchools() {
    $(".schoolCheckbox").each( ( index, checkbox ) => {
      if($(checkbox).prop('checked')) {
        let schoolId = $(checkbox).attr("value");
        Meteor.call("aproveSchool", schoolId, function(err, res) {
          if(err) {
            alert(err.reason);
          }
        })
      }
    })
  }
  
  
  render() {
    return (
      <div className="contentContainer">
        <div style={{"maxWidth":"100%"}} className="cardContainer card blockCenter">
          <h1 className="margin-0">New Registraitions</h1>
        </div>
        <div style={{"maxWidth":"100%"}} className="card blockCenter">
          <div className="tableContainer">
            <table>
              <tbody>
                <tr>
                  <th>Check</th>
                  <th>School Name</th>
                  <th>School Email</th>
                  <th>School Type</th>
                  <th>Curriculem Type</th>
                </tr>
                {this.props.schools.map((school, index) => (
                  <tr key={school._id}>
                    <td><input className="schoolCheckbox" type="checkbox" value={school._id}/></td>
                    <td>{school.schoolName}</td>
                    <td>{school.schoolEmail}</td>
                    <td>{school.schoolType}</td>
                    <td>{school.curriculumType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br/>
          <div>
            <button onClick={ this.aproveSchools } className="margin-5 btn btn-primary">Aprove</button>
          </div>
        </div>
      </div>
    );
  }
}

const NewRegistrationsContainer = withTracker(({ id }) => {
  Meteor.subscribe('unVerifiedSchools');
  const schools = Schools.find().fetch();
  return {
    schools
  };
})(NewRegistrations);

export default NewRegistrationsContainer;