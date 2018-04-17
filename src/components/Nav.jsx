/* 
* Require react */
var React = require('react');

/* 
* Require react-router link */
var {Link, hashHistory} = require('react-router');

/* 
* Require APIs */
var AuthAPI = require('../api/AuthAPI');
var TodoAPI = require('../api/TodoAPI');

/* 
* Define component */
var Nav = React.createClass({

  /* 
  * Handle when user click Logout */
  onLogoutClick: function() {
    // Logout for user
    AuthAPI.logout();
    TodoAPI.logoutStorage();
  },
  
  /* 
  * Render the components */
  render: function() {
    // Avoid 'this'
    var _Nav = this;

    /* 
    * Render content for navbar right-side menu, base on login state of user */
    var renderRightMenu = function() {
      if (AuthAPI.isLoggedIn()) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/todos" className="nav-link">
                {AuthAPI.getCurrentUserName()}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={_Nav.onLogoutClick}>
                <span className="oi oi-account-logout logout-icon"></span>
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
                <span className="oi oi-account-login login-icon"></span>
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
    var renderNavbarBrand = function() {
      if (AuthAPI.isLoggedIn()) {
        return (<Link to="/todos" className="navbar-brand">Todo App</Link>);
      } else {
        return (<Link to="/" className="navbar-brand">Todo App</Link>);
      }
    };

    /* 
    * Render the component */
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

        {renderNavbarBrand()}

        <button className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/todos" className="nav-link">Todos</Link>
            </li>
          </ul>

          {renderRightMenu()}

        </div>
          
      </nav>
    ); 
  }
});

/* 
* Export the component */
module.exports = Nav;