/* 
* Require react */
import React from 'react';

/* 
* Require hashHistory in react-router */
import {hashHistory} from 'react-router';


/* 
* Defining component */
class TodoControls extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.redirectToHome = this.redirectToHome.bind(this);
  };

  /* 
  * Redirect to Home page */
  redirectToHome() {
    /* 
    * More about history:
    *   https://reacttraining.com/react-router/core/api/history */
    hashHistory.push('/todos');
  };

  /* 
  * Render component */
  render() {

    // Get completed state of todo, to render the Complete button
    var completed = this.props.completedState;

    return (
      <div className="controls-form">
        <button 
          type="button"
          className="btn btn-primary complete-button"
          onClick={this.props.onUpdateStatus}
        >
          {completed ? "Uncomplete" : "Complete"}
        </button>

        <button 
          className="btn btn-secondary back-button"
          onClick={this.redirectToHome}
        >
          Back
        </button>
      </div>
    );
  };
};

/* 
* Export the component */
export default TodoControls;