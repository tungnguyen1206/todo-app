/* 
* Require react */
var React = require('react');

/* 
* Require react-router link */
var {Link} = require('react-router');

/* 
* Define component */
var Nav = React.createClass({
  
  /* 
  * Render the components */
  render: function() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

        <Link to="/" className="navbar-brand">Todo App</Link>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/todos" className="nav-link">Home</Link>
          </li>

          {/* <li className="nav-item">
            <Link to="/tododetails" className="nav-link">Details</Link>
          </li> */}
        </ul>

        <ul className="navbar-nav ml-auto">
          <li>
            <Link to="#" className="nav-link">Login</Link>
          </li>
          <li>
            <Link to="#" className="nav-link">Register</Link>
          </li>
        </ul>
          
      </nav>
    ); 
  }
});

/* 
* Export the component */
module.exports = Nav;