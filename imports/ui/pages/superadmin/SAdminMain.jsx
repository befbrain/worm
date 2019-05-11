import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class SAdminMain extends Component {
  constructor(props) { // Hi! Its Brandon!!!!
    super(props);
    // }
    this.state = { page:"main" };
    
    this.render = this.render.bind(this);

  }
  
  render() {
    return (
      <div>
        Main Super Admin Dashboard
      </div>
    );
  }
}
export default SAdminMain;