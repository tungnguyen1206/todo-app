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

    var renderRightMenu = function() {
      if (AuthAPI.isLoggedIn()) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/todos" className="nav-link">{AuthAPI.getCurrentUserName()}</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={_Nav.onLogoutClick}>Logout</Link>
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        );
      }
    };

    /* 
    * Render the component */
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

        <Link to="/" className="navbar-brand">Todo App</Link>

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
              <Link to="/todos" className="nav-link">Home</Link>
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