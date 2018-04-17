/* 
* Require react, react-router */
var React = require('react');
var {hashHistory} = require('react-router');

/* 
* Require node-uuid library */
var uuid = require('node-uuid');

/* 
* Require moment */
var moment = require('moment');

/* 
* Require components */
var TodoList = require('./TodoList');
var AddTodo = require('./AddTodo');
var TodoSearch = require('./TodoSearch');

/* 
* Require APIs */
var TodoAPI = require('../../api/TodoAPI');
var AuthAPI = require('../../api/AuthAPI');

/* 
* Define Todo component */
var TodoApp = React.createClass({

  /* 
  * Initial state */
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: [],
    };
  },

  /* 
  * Redirect if user is not logged in */
  componentWillMount: function() {
    // Avoid 'this'
    var _TodoApp = this;

    if (!AuthAPI.isLoggedIn()) {
      hashHistory.push('/login');
    } else {
      TodoAPI.registerStorage(AuthAPI.getCurrentUserId());
      _TodoApp.setState({
        showCompleted: false,
        searchText: '',
        todos: TodoAPI.getTodos(),
      });
    }  
  },

  /* 
  * Save new Todos to local storage when the component was updated 
  * 
  * This method has some problems with tests: todos is not defined
  * How to fix it? */
  componentDidUpdate: function() {
    TodoAPI.setTodos(this.state.todos);
  },

  /* 
  * This function handle search Todo */
  handlingSearchTodo: function(_showCompleted, _searchText) {
    var _TodoApp = this;
    _TodoApp.setState({
      showCompleted: _showCompleted,
      searchText: _searchText
    });
  },

  /*
  * This function handle new Todo input */
  handlingNewTodo: function(_newTodoText) {
    var _TodoApp = this;
    // Get old todos array
    var oldTodos = _TodoApp.state.todos;
    // Push new todo to todos array
    _TodoApp.setState({
      todos: [
        /* 
        * Spread syntax:
        *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax */
        ...oldTodos,
        {
          id: uuid(),
          text: _newTodoText,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    });
  },

  /* 
  * This function handle delete todo by it's id */
  handlingDeleteTodo: function(_id) {
    var _TodoApp = this;
    // Check if delete is success
    if (TodoAPI.deleteTodoById(_id)) {
      // Set the new state
      _TodoApp.setState({todos: TodoAPI.getTodos()});
      console.log('Delete success');
    } else {
      console.log('Delete failed');
    }
  },

  /* 
  * Handle toggle todos */
  handlingToggle: function(_id) {
    // Avoid 'this'
    var _TodoApp = this;
    // Update the Todos array
    var updatedTodos = _TodoApp.state.todos.map((todo) => {
      if (todo.id === _id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }
      return todo;
    });
    // Set the new state
    _TodoApp.setState({todos: updatedTodos});
  },

  /* Render the component */
  render: function() {
    // Avoid 'this'
    var _TodoApp = this;

    // Get values
    var {todos, showCompleted, searchText} = _TodoApp.state;

    // Filtered list
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return ( 
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            <TodoSearch onSearch={_TodoApp.handlingSearchTodo}/>
            <TodoList todoList={filteredTodos}
                      onToggle={_TodoApp.handlingToggle} 
                      onDeleteClick={_TodoApp.handlingDeleteTodo}/>
            <AddTodo onNewTodo={_TodoApp.handlingNewTodo}/>
          </div>
        </div>
      </div>
    );
  }
});

/* 
* Export the component */
module.exports = TodoApp;