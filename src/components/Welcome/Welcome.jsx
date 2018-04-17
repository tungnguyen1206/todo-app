/* 
* Require react */
var React = require('react');

/* 
* Require Link in react-router */
var {Link, hashHistory} = require('react-router');

/* 
* Define Welcome component */
var Welcome = React.createClass({

  /* 
  * Redirect to login page when user click on login button */
  onLoginClick: function() {
    hashHistory.push('/login');
  },
  
  /* 
  * Redirect to register page when user click on register button */
  onRegisterClick: function() {
    hashHistory.push('/register');
  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _Welcome = this;

    return (
      <div>
        
        <h1 className="welcome-title">Welcome to Todo App</h1>
        <p className="intro-line">Let us help you remember all things you have to do</p>
        
        <div className="button-container">
          <button className="btn btn-primary welcome-button"
                  onClick={_Welcome.onLoginClick}>
            Login
          </button>
        </div>
        <div className="button-container">
          <button className="btn btn-success welcome-button"
                  onClick={_Welcome.onRegisterClick}>
            Register
          </button>
        </div>

      </div>
    );
  }
});

/* 
* Export the component */
module.exports = Welcome;