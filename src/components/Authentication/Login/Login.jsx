/* 
* Require react, react-router hashHistory */
var React = require('react');
var {hashHistory} = require('react-router');

/* 
* Require other components */
var LoginForm = require('./LoginForm');

/* 
* Require APIs */
var AuthAPI = require('../../../api/AuthAPI');

/*
* Define component */
var Login = React.createClass({

  /* 
  * Redirect if user is logged in */
  componentWillMount: function() {
    if(AuthAPI.isLoggedIn()) {
      hashHistory.push('/todos');
    }
  },

  /* 
  * Handle when user login */
  loginFor: function(_user) {

    if (AuthAPI.login(_user)) {
      // Auto redirect to TodoApp
      hashHistory.push('/todos');
      console.log('Login success');
    } else {
      console.log('Login failed');
    }

  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _Login = this;
    
    return (
      <div>

        <h1 className="page-title">Login</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            <LoginForm onLogin={_Login.loginFor}/>
          </div>
        </div>

      </div>
    );
  }
});


/* 
* Export the component */
module.exports = Login;