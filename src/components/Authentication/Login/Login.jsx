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
  * Get initial state */
  getInitialState: function() {
    return {
      loginError: false
    };
  },

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
      // Set error to the state
      this.setState({
        loginError: true
      });
      console.log('Login failed');
    }

  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _Login = this;

    // Render error alert
    var renderErrorAlert = function() {
      if (_Login.state.loginError) {
        return (
          <div className="alert alert-danger alert-dismissible fade show alert-login-error" role="alert">
            Login failed! Incorrect username or password.
            <button type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close">
              <span className="oi oi-x dissmis-login-alert-button" aria-hidden="true"></span>
            </button> 
          </div>
        );
      } else {
        // return ();
      }
    };
    
    return (
      <div>

        <h1 className="page-title">Login</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            
            <div className="row">
              <div className="col-10 offset-1">
                {renderErrorAlert()}
              </div>
            </div> 
            
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