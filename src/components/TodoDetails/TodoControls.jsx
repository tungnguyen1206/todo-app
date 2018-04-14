/* 
* Require react */
var React = require('react');

/* 
* Require hashHistory in react-router */
var {hashHistory} = require('react-router');


/* 
* Defining component */
var TodoControls = React.createClass({

  /* 
  * Redirect to Home page */
  redirectToHome: function() {
    debugger;
    /* 
    * More about history:
    *   https://reacttraining.com/react-router/core/api/history */
    hashHistory.goBack();
  },

  /* 
  * Render component */
  render: function() {
    // Avoid 'this'
    var _TodoControls = this;

    // Get completed state of todo, to render the Complete button
    var completed = _TodoControls.props.completedState;

    return (
      <div className="controls-form">
        <button type="button"
                className="btn btn-primary complete-button"
                onClick={_TodoControls.props.onUpdateStatus}>{completed ? "Uncomplete" : "Complete"}</button>
        <button className="btn btn-secondary back-button"
                onClick={_TodoControls.redirectToHome}>Back</button>
      </div>
    );
  }
});

/* 
* Export the component */
module.exports = TodoControls;