/* 
* Require react */
var React = require('react');

/* 
* Require moment */
var moment = require('moment');

/* 
* Require components */
var TodoInfo = require('./TodoInfo');
var TodoControls = require('./TodoControls');

/* 
* Require APIs */
var TodoAPI = require('../../api/TodoAPI');

/* 
* Define Todo component */
var TodoDetails = React.createClass({
  
  /* 
  * Initial States */
  getInitialState: function() {
    // Avoid 'this'
    var _TodoDetails = this;

    // Get id from URL parameter
    var _id = _TodoDetails.props.params.todoid;

    return {
      todo: TodoAPI.getTodoById(_id)
    }
  },

  /* 
  * Update localStorage with new data before the component unmount */
  componentWillUnmount: function() {
    var _newTodo = this.state.todo;
    var _id = _newTodo.id;
    TodoAPI.updateTodoById(_id, _newTodo);
  },

  /* 
  * Handle when user clicks on Complete button */
  onUpdateCompleted: function() {
    // Avoid 'this'
    var _TodoDetails = this;
    
    // Get old values
    var _oldTodo = _TodoDetails.state.todo;
    var _oldCompleted = _oldTodo.completed;

    // Change completed and completedAt
    this.setState({
      todo: {
        id: _oldTodo.id,
        text: _oldTodo.text,
        createdAt: _oldTodo.createdAt,
        completed: !_oldCompleted,
        completedAt: (!_oldCompleted) ? moment().unix() : undefined,
      }
    });
  },


  /* Render the component */
  render: function() {
    // Avoid 'this'
    var _TodoDetails = this;

    // Get value of state
    var todo = _TodoDetails.state.todo;

    return ( 
      <div>

        <h1 className="page-title">Todo Details</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            <TodoInfo todo={todo}/>
            <TodoControls completedState={todo.completed} 
                          onUpdateStatus={_TodoDetails.onUpdateCompleted}/>
          </div>
        </div>

      </div>
    );
  }
});

/* 
* Export the component */
module.exports = TodoDetails;