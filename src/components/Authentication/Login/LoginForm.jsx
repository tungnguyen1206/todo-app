/* 
* Require react */
import React from 'react';


/*
* Define component */
class LoginForm extends React.Component {
  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onFormSubmit = this.onFormSubmit.bind(this);

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

    // Check input is valid or not
    if (user.username.length > 0 && user.password.length > 0) {
      // Clean form
      this.passwordInput.value = '';
      // Push up data
      this.props.onLogin(user);
    }
  };

  /* 
  * Render component */
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="row form-row-login">
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

          <div className="row form-row-login">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="pass-word">Password:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  
                type="password" 
                id="pass-word"
                className="form-control password-input"
                ref={(thisRef) => {this.passwordInput = thisRef;}}
              />
            </div>
          </div>

          <div className="row form-row-login">
            <div className="col-xs-10 col-sm-10 col-md-10 offset-1">
              <button 
                type="submit"
                className="btn btn-block btn-primary float-right login-button"
              >
                Login
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
export default LoginForm;