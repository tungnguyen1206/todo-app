/* 
* Require react and react-router */
import React from 'react';
import {hashHistory} from 'react-router';

/* 
* Require components */
import Todo from './Todo';

/* 
* Define TodoList component */
class TodoList extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.redirectToTodoDetailsId = this.redirectToTodoDetailsId.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    // Bind optional render methods
    this.renderTodos = this.renderTodos.bind(this);

  };

  /* 
  * Redirect to details page when user click on details arrow container */
  redirectToTodoDetailsId(_id) {
    return (() => {
      hashHistory.push(`/todos/${_id}`);
    });
  };

  /* 
  * Delete todo when user click on delete container */
  onDeleteClick(_id) {
    return (() => {
      // Pass this function to parent
      this.props.onDeleteClick(_id);
    });
  };


  /* 
  * Loop through todos array and render each todo */
  renderTodos() {
    // Get values
    var {todoList} = this.props;

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
              <Todo key={todo.id} onToggle={this.props.onToggle} {...todo} /> 
            </div>

            <div>
              <div  
                className="todo-detail-arrow-container"
                title="Show details"
                onClick={this.redirectToTodoDetailsId(todo.id)}
              >
                <p className="for-icon">
                  <span className="oi oi-chevron-right todo-detail-arrow" />
                </p>
              </div>
              
              <div  
                className="todo-delete-container"
                title="Delete"
                onClick={this.onDeleteClick(todo.id)}
              >
                <p className="for-icon">
                  <span className="oi oi-trash todo-delete" />
                </p>
              </div>
            </div>

          </div>
        );
        
      });
    }
  };

  /* Render component */
  render() {
    return (
      <div className="container-body">
        {this.renderTodos()}
      </div>
    );
  };

};


// Default props
TodoList.defaultProps = {
  todoList: [],
};


/* 
* Export the component */
export default TodoList;