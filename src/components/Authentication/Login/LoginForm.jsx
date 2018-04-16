/* 
* Require react */
var React = require('react');


/*
* Define component */
var LoginForm = React.createClass({

  /* 
  * Handle form submit */
  onFormSubmit: function(e) {
    // Prevent reload page
    e.preventDefault();
    // Declare user variable
    var user = {};
    // Get value from the form
    user.username = this.refs.usernameInput.value;
    user.password = this.refs.passwordInput.value;

    // Check input is valid or not
    if (user.username.length > 0 && user.password.length > 0) {
      // Clean form
      // this.refs.usernameInput.value = '';
      this.refs.passwordInput.value = '';
      // Push up data
      this.props.onLogin(user);
    }
  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _LoginForm = this;

    return (
      <div>
        <form onSubmit={_LoginForm.onFormSubmit}>
          <div className="row form-row-login">
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

          <div className="row form-row-login">
            <div className="col-xs-4 col-sm-4 col-md-4 offset-1">
              <label htmlFor="pass-word">Password:</label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <input  type="password" 
                      id="pass-word"
                      className="form-control password-input"
                      ref="passwordInput"/>
            </div>
          </div>

          <div className="row form-row-login">
            <div className="col-xs-10 col-sm-10 col-md-10 offset-1">
              <button type="submit"
                      className="btn btn-block btn-primary float-right login-button">Login</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
});


/* 
* Export the component */
module.exports = LoginForm;