/* 
* Require react and react-router */
var React = require('react');
var {Link, hashHistory} = require('react-router');

/* 
* Require components */
var Todo = require('./Todo');

/* 
* Define TodoList component */
var TodoList = React.createClass({

  //  PropTypes 
  propTypes: {
    todoList: React.PropTypes.array,
  },

  /* 
  * Redirect to details page when user click on arrow container */
  redirectToTodoDetailsId: function(_id) {
    return (() => {
      hashHistory.push(`/todos/${_id}`);
    });
  },

  /* Render component */
  render: function() {
    // Avoid 'this'
    var _TodoList = this;

    // Get values
    var {todoList} = _TodoList.props;

    /* 
    * Loop through todos array and render each todo */
    var renderTodos = function() {
      if (todoList.length === 0) {
        return <p className="container-message">Nothing to do</p>
      } else {
        /* 
        * This function use Lists and Keys:
        *   https://reactjs.org/docs/lists-and-keys.html 
        * 
        * This function use map() method:
        * The map() method creates a new array with the results
        * of calling a provided function on every element in the calling array. 
        * About Array.prototype.map(): 
        *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */
        return todoList.map((todo) => {
          return (
            /* 
            * Spread syntax: {...todo} -> id={2} text={"Some text"}
            *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax */
            <div className="todo-container">
              <div className="todo-text-container">
                <Todo key={todo.id} onToggle={_TodoList.props.onToggle} {...todo}/> 
              </div>
              <div  className="todo-detail-arrow-container"
                    onClick={_TodoList.redirectToTodoDetailsId(todo.id)}>
                <p><span className="oi oi-chevron-right detail-arrow"></span></p>
              </div>
            </div>
          );
          
        });
      }
    };

    return (
      <div className="container-body">
        {renderTodos()}
      </div>
    );
  }

});

/* 
* Export the component */
module.exports = TodoList;