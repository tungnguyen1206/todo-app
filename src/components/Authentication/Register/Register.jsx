/* 
* Require react, react-router hashHistory */
var React = require('react');
var {hashHistory} = require('react-router');

/* 
* Require other components */
var RegisterForm = require('./RegisterForm');

/* 
* Require APIs */
var AuthAPI = require('../../../api/AuthAPI');

/*
* Define component */
var Register = React.createClass({
  
  /* 
  * Redirect if user is logged in */
  componentWillMount: function() {
    if(AuthAPI.isLoggedIn()) {
      hashHistory.push('/todos');
    }
  },

  /* 
  * Handle when user login */
  registerFor: function(_user) {

    if (AuthAPI.register(_user)) {
      // Auto login for registered user
      AuthAPI.login(_user);
      // Redirect to TodoApp
      hashHistory.push('/todos');
      console.log('Register success');    
    } else {
      console.log('Register failed');
    }

  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _Register = this;

    return (
      <div>

        <h1 className="page-title">Register</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            <RegisterForm onRegister={_Register.registerFor}/>
          </div>
        </div>

      </div>
    );
  }
});


/* 
* Export the component */
module.exports = Register;