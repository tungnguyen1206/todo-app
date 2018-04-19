/* 
* Require react, react-router hashHistory */
import React from 'react';
import {hashHistory} from 'react-router';

/* 
* Require other components */
import LoginForm from './LoginForm';

/* 
* Require APIs */
import AuthAPI from '../../../api/AuthAPI';

/*
* Define component */
class Login extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.loginFor = this.loginFor.bind(this);

    // Bind optional render methods
    this.renderErrorAlert = this.renderErrorAlert.bind(this);

    // Initial state
    this.state = {
      loginError: false      
    };
  };

  /* 
  * Redirect if user is logged in */
  componentWillMount() {
    if(AuthAPI.isLoggedIn()) {
      hashHistory.push('/todos');
    }
  };

  /* 
  * Handle when user login */
  loginFor(_user) {

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

  };

  /* 
  * Render error alert */
  renderErrorAlert() {
    if (this.state.loginError) {
      return (
        <div className="alert alert-danger alert-dismissible fade show alert-login-error" role="alert">
          Login failed! Incorrect username or password.
          <button 
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span className="oi oi-x dissmis-login-alert-button" aria-hidden="true" />
          </button> 
        </div>
      );
    } else {
      return null;
    }
  };

  /* 
  * Render component */
  render() {
    return (
      <div>

        <h1 className="page-title">Login</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            
            <div className="row">
              <div className="col-10 offset-1">
                {this.renderErrorAlert()}
              </div>
            </div> 
            
            <LoginForm onLogin={this.loginFor} />
            
          </div>
        </div>

      </div>
    );
  };
};


/* 
* Export the component */
export default Login;