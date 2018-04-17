/* 
* Require react & react-router */
var React = require('react');
var {hashHistory} = require('react-router');

/* 
* Require components */
var Nav = require('./Nav');

/* 
* Require APIs */
var AuthAPI = require('../api/AuthAPI');

/* 
* Define Main component */
var Main = React.createClass({
  /* 
  * Redirect when user was logged in */
  componentWillMount: function() {
    // Checking and redirecting
    if (AuthAPI.isLoggedIn()) {
      hashHistory.push('/todos');
    }
  },

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