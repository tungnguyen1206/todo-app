/* 
* Require react */
import React from 'react';

/* 
* Require Link in react-router */
// import {Link} from 'react-router';

/* 
* Require moment */
import moment from 'moment';

/* 
* Define Todo component */
class Todo extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onToggle = this.onToggle.bind(this);

  };

  /* 
  * Handle toggle todo 
  * 
  * Use function returns function because we need to push up 
  * the reference of function, not value of function
  * For more informations: 
  *   https://reactjs.org/docs/faq-functions.html */
  onToggle(_id) {
    return () => {
      this.props.onToggle(_id);      
    };
  };

  /* 
  * Render timeStamp */
  renderTimeStamp() {
    var {completed, createdAt, completedAt} = this.props;

    // Uncompleted
    var timeStamp = createdAt;
    var message = "Created ";

    // Completed
    if (completed) {
      timeStamp = completedAt;
      message = "Completed ";
    }

    return message + moment.unix(timeStamp).format('MMMM Do, YYYY @ hh:mm A');
  };

  /* Render the component */
  render() {
   
    // Get values
    var {id, text, completed} = this.props;

    // Conditional className for todo
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    return (
      <div className={todoClassName} onClick={this.onToggle(id)}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo-subtext">{this.renderTimeStamp()}</p>
        </div>
      </div>
    );
  };
};

/* 
* Export the component */
export default Todo;