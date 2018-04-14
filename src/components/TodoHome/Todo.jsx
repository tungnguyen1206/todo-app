/* 
* Require react */
var React = require('react');

/* 
* Require Link in react-router */
var {Link} = require('react-router');

/* 
* Require moment */
var moment = require('moment');

/* 
* Define Todo component */
var Todo = React.createClass({

  //  PropTypes 
  propTypes: {
    onToggle: React.PropTypes.func,
  },

  /* 
  * Handle toggle todo 
  * 
  * Use function returns function because we need to push up 
  * the reference of function, not value of function
  * For more informations: 
  *   https://reactjs.org/docs/faq-functions.html */
  onToggle: function(_id) {
    // Avoid 'this'
    var _Todo = this;
    return () => {
      _Todo.props.onToggle(_id);      
    };
  },

  /* Render the component */
  render: function() {

    var _Todo = this;
    
    // Get values
    var {id, text, completed, createdAt, completedAt} = _Todo.props;

    // Conditional className for todo
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    // Render timeStamp
    var renderTimeStamp = () => {
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

    return (
      <div className={todoClassName} onClick={_Todo.onToggle(id)}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <Link to={`todos/${id}`}>{text}</Link>
          <p className="todo-subtext">{renderTimeStamp()}</p>
        </div>
      </div>
    );
  }
});

/* 
* Export the component */
module.exports = Todo;