/* 
* Require react */
import React from 'react';

/* 
* Require react-router link */
import {Link} from 'react-router';

/* 
* Require APIs */
import AuthAPI from '../api/AuthAPI';
import TodoAPI from '../api/TodoAPI';

/* 
* Define component */
class Nav extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onLogoutClick = this.onLogoutClick.bind(this);

    // Bind optional render methods
    this.renderRightMenu = this.renderRightMenu.bind(this);
  }

  /* 
  * Handle when user click Logout */
  onLogoutClick() {
    // Logout for user
    AuthAPI.logout();
    TodoAPI.logoutStorage();
  };

  /* 
  * Render content for navbar right-side menu, base on login state of user */
  renderRightMenu() {
    if (AuthAPI.isLoggedIn()) {
      return (
        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/todos" className="nav-link">
              {AuthAPI.getCurrentUserName()}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={this.onLogoutClick}>
              <span className="oi oi-account-logout logout-icon" aria-hidden="true" />
              Logout
            </Link>
          </li>

        </ul>
      );

    } else {
      return (
        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <span className="oi oi-account-login login-icon" aria-hidden="true" />
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>

        </ul>
      );
    }
  };

  /* 
  * Render content for navbar-brand base on login state of user */
  renderNavbarBrand() {
    if (AuthAPI.isLoggedIn()) {
      return (<Link to="/todos" className="navbar-brand">Todo App</Link>);
    } else {
      return (<Link to="/" className="navbar-brand">Todo App</Link>);
    }
  };
  
  /* 
  * Render the components */
  render() {
    /* 
    * Render the component */
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

        {this.renderNavbarBrand()}

        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/todos" className="nav-link">Todos</Link>
            </li>
          </ul>

          {this.renderRightMenu()}

        </div>
          
      </nav>
    ); 
  };

};

/* 
* Export the component */
export default Nav;