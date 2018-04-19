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
  * Get initial state */
  getInitialState: function() {
    return {
      registerError: false
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
  registerFor: function(_user) {

    if (AuthAPI.register(_user)) {
      // Auto login for registered user
      AuthAPI.login(_user);
      // Redirect to TodoApp
      hashHistory.push('/todos');
      console.log('Register success');    
    } else {
      // Set error to the state
      this.setState({
        registerError: true
      });
      console.log('Register failed');
    }

  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _Register = this;

    // Render error alert
    var renderErrorAlert = function() {
      if (_Register.state.registerError) {
        return (
          <div className="alert alert-danger alert-dismissible fade show alert-register-error" role="alert">
            Register failed! This username was used.
            <button type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close">
              <span className="oi oi-x dissmis-register-alert-button" aria-hidden="true"></span>
            </button> 
          </div>
        );
      } else {
        // return ();
      }
    };

    return (
      <div>

        <h1 className="page-title">Register</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
           
            <div className="row">
              <div className="col-10 offset-1">
                {renderErrorAlert()}
              </div>
            </div>  
            
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