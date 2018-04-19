/* 
* Require react */
import React from 'react';

/* 
* Require Link in react-router */
import {hashHistory} from 'react-router';

/* 
* Define Welcome component */
class Welcome extends React.Component {
  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  };

  /* 
  * Redirect to login page when user click on login button */
  onLoginClick() {
    hashHistory.push('/login');
  };
  
  /* 
  * Redirect to register page when user click on register button */
  onRegisterClick() {
    hashHistory.push('/register');
  };

  /* 
  * Render component */
  render() {
    return (
      <div>
        
        <h1 className="welcome-title">
          Welcome to Todo App
        </h1>
        <p className="intro-line">
          Let us help you remember all things you have to do
        </p>
        
        <div className="button-container">
          <button 
            className="btn btn-primary welcome-button"
            onClick={this.onLoginClick}
          >
            Login
          </button>
        </div>
        
        <div className="button-container">

          <button 
            className="btn btn-success welcome-button"
            onClick={this.onRegisterClick}
          >
            Register
          </button>

        </div>

      </div>
    );
  };
};

/* 
* Export the component */
export default Welcome;