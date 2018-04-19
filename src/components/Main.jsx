/* 
* Require react & react-router */
import React from 'react';
import {hashHistory} from 'react-router';

/* 
* Require components */
import Nav from './Nav';

/* 
* Require APIs */
import AuthAPI from '../api/AuthAPI';

/* 
* Define Main component */
class Main extends React.Component {

  /* 
  * Redirect when user was logged in */
  componentWillMount() {
    // Checking and redirecting
    if (AuthAPI.isLoggedIn()) {
      hashHistory.push('/todos');
    }
  };

  /* 
  * Render the component */
  render() {
    return ( 
      <div>
        <Nav />
        {// Specify where to render the child routing component
          this.props.children
        }
      </div>
    );
  };

};

/* 
* Export the component */
export default Main;