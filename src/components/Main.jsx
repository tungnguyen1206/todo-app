/* 
* Require react */
var React = require('react');

/* 
* Require components */
var Nav = require('./Nav');

/* 
* Define Main component */
var Main = React.createClass({

  /* 
  * Render the component */
  render: function() {
    return ( 
      <div>
        <Nav/>
        {// Specify where to render the child routing component
          this.props.children
        }
      </div>
    );
  }
});

/* 
* Export the component */
module.exports = Main;