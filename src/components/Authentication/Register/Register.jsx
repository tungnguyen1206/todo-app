/* 
* Require react, react-router hashHistory */
import React from 'react';
import {hashHistory} from 'react-router';

/* 
* Require other components */
import RegisterForm from './RegisterForm';

/* 
* Require APIs */
import AuthAPI from '../../../api/AuthAPI';

/*
* Define component */
class Register extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.registerFor = this.registerFor.bind(this);

    // Bind optional render methods
    this.renderErrorAlert = this.renderErrorAlert.bind(this);

    // Initial state
    this.state = {
      registerError: false      
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
  registerFor(_user) {

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

  };

  /* 
  * Render error alert */
  renderErrorAlert() {
    if (this.state.registerError) {
      return (
        <div className="alert alert-danger alert-dismissible fade show alert-register-error" role="alert">
          Register failed! This username was used.
          <button 
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span className="oi oi-x dissmis-register-alert-button" aria-hidden="true" />
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

        <h1 className="page-title">Register</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
           
            <div className="row">
              <div className="col-10 offset-1">
                {this.renderErrorAlert()}
              </div>
            </div>  
            
            <RegisterForm onRegister={this.registerFor} />

          </div>
        </div>

      </div>
    );
  };
};


/* 
* Export the component */
export default Register;