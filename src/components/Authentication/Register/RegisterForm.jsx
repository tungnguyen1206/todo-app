/* 
* Require react */
var React = require('react');


/*
* Define component */
var RegisterForm = React.createClass({
  /* 
  * Initial state */
  getInitialState: function() {
    return {
      confirmEmpty: true,
      passwordMatch: false
    }
  },

  /* 
  * Handle form submit */
  onFormSubmit: function(e) {
    // Prevent reload page
    e.preventDefault();
    // Avoid 'this'
    var _RegisterForm = this;
    // Declare user variable
    var user = {};
    // Get value from the form
    user.username = _RegisterForm.refs.usernameInput.value;
    user.password = _RegisterForm.refs.passwordInput.value;
    var confirmPassword = _RegisterForm.refs.confirmPasswordInput.value;

    // Check input is valid or not
    if (user.username.length > 0 && user.password.length > 0 && confirmPassword.length > 0) {
      // Clean password fields
      _RegisterForm.refs.passwordInput.value = '';
      _RegisterForm.refs.confirmPasswordInput.value = '';

      if (user.password === confirmPassword) {
        // Clean username
        this.refs.usernameInput.value = '';
        // Reset state
        _RegisterForm.setState({
          confirmEmpty: true,
          passwordMatch: false
        });
        // Push up data
        _RegisterForm.props.onRegister(user);
      }
    }
  },

  /* 
  * Change passwordMatch state base on comfirmation */
  changeConfirmState: function() {
    var _RegisterForm = this;
      
    // get value from two password fields
    var pass = _RegisterForm.refs.passwordInput.value;
    var c_pass = _RegisterForm.refs.confirmPasswordInput.value;
    
    // If user has not typed in confirm-box yet
    if (c_pass.length === 0) {
      _RegisterForm.setState({
        confirmEmpty: true,
        passwordMatch: false
      });
    // If two passwords match
    } else if (c_pass === pass) {
      _RegisterForm.setState({
        confirmEmpty: false,
        passwordMatch: true
      });
    // If two passwords not match
    } else {
      _RegisterForm.setState({
        confirmEmpty: false,
        passwordMatch: false
      });
    }
  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _RegisterForm = this;

    // Get value from state
    var {confirmEmpty, passwordMatch} = _RegisterForm.state;

    // Conditionally apply class for confirm password input
    var classForConfirmPassword = function() {
      // Empty confirmation
      if (confirmEmpty) {
        return ('form-control confirm-password-input');
      } else {
        // Password match
        if (passwordMatch) {
          return ('form-control confirm-password-input valid-input');
        // Password not match
        } else {
          return ('form-control confirm-password-input invalid-input');
        }
      }
    };

    return (
      <div>
        <form onSubmit={_RegisterForm.onFormSubmit}>
          <div className="row form-row-register">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="usr-name">Username:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  type="text" 
                      id="usr-name"
                      className="form-control username-input"
                      ref="usernameInput"/>
            </div>
          </div>

          <div className="row form-row-register">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="pass-word">Password:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  type="password" 
                      id="pass-word"
                      className="form-control password-input"
                      onChange={_RegisterForm.changeConfirmState}
                      ref="passwordInput"/>
            </div>
          </div>

          <div className="row form-row-register">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="confirm-pass-word">Confirm Password:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  type="password" 
                      id="confirm-pass-word"
                      className={classForConfirmPassword()}
                      onChange={_RegisterForm.changeConfirmState}
                      ref="confirmPasswordInput"/>
            </div>
          </div>

          <div className="row form-row-register">
            <div className="col-xs-10 col-sm-10 col-md-10 offset-1">
              <button type="submit"
                      className="btn btn-block btn-primary float-right login-button">Register</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
});


/* 
* Export the component */
module.exports = RegisterForm;