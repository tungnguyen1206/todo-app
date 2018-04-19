/* 
* Require react */
import React from 'react';


/*
* Define component */
class RegisterForm extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.changeConfirmState = this.changeConfirmState.bind(this);

    // Initial state
    this.state = {
      confirmEmpty: true,
      passwordMatch: false
    };
  };

  /* 
  * Handle form submit */
  onFormSubmit(e) {
    // Prevent reload page
    e.preventDefault();
    // Declare user variable
    var user = {};
    // Get value from the form
    user.username = this.usernameInput.value;
    user.password = this.passwordInput.value;
    var confirmPassword = this.confirmPasswordInput.value;

    // Check input is valid or not
    if (user.username.length > 0 && user.password.length > 0 && confirmPassword.length > 0) {
      // Clean password fields
      this.passwordInput.value = '';
      this.confirmPasswordInput.value = '';

      if (user.password === confirmPassword) {
        // Reset state
        this.setState({
          confirmEmpty: true,
          passwordMatch: false
        });
        // Push up data
        this.props.onRegister(user);
      }
    }
  };

  /* 
  * Change passwordMatch state base on comfirmation */
  changeConfirmState() {
      
    // get value from two password fields
    var pass = this.passwordInput.value;
    var c_pass = this.confirmPasswordInput.value;
    
    // If user has not typed in confirm-box yet
    if (c_pass.length === 0) {
      this.setState({
        confirmEmpty: true,
        passwordMatch: false
      });
    // If two passwords match
    } else if (c_pass === pass) {
      this.setState({
        confirmEmpty: false,
        passwordMatch: true
      });
    // If two passwords not match
    } else {
      this.setState({
        confirmEmpty: false,
        passwordMatch: false
      });
    }
  };

  /* 
  * Conditionally apply class for confirm password input */
  classForConfirmPassword() {
    // Get value from state
    var {confirmEmpty, passwordMatch} = this.state;

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

  /* 
  * Render component */
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="row form-row-register">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="usr-name">Username:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  
                type="text" 
                id="usr-name"
                className="form-control username-input"
                ref={(thisRef) => {this.usernameInput = thisRef;}}
              />
            </div>
          </div>

          <div className="row form-row-register">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="pass-word">Password:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input
                type="password" 
                id="pass-word"
                className="form-control password-input"
                onChange={this.changeConfirmState}
                ref={(thisRef) => {this.passwordInput = thisRef;}}
              />
            </div>
          </div>

          <div className="row form-row-register">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="confirm-pass-word">Confirm Password:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  
                type="password" 
                id="confirm-pass-word"
                className={this.classForConfirmPassword()}
                onChange={this.changeConfirmState}
                ref={(thisRef) => {this.confirmPasswordInput = thisRef;}}
              />
            </div>
          </div>

          <div className="row form-row-register">
            <div className="col-xs-10 col-sm-10 col-md-10 offset-1">
              <button 
                type="submit"
                className="btn btn-block btn-primary float-right login-button"
              >
                Register
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  };
};


/* 
* Export the component */
export default RegisterForm;