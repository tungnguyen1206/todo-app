/* 
* Require react, react-router */
import React from 'react';
import {hashHistory} from 'react-router';

/* 
* Require node-uuid library */
import uuid from 'node-uuid';

/* 
* Require moment */
import moment from 'moment';

/* 
* Require components */
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import TodoSearch from './TodoSearch';

/* 
* Require APIs */
import TodoAPI from '../../api/TodoAPI';
import AuthAPI from '../../api/AuthAPI';

/* 
* Define Todo component */
class TodoApp extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.handleSearchTodo = this.handleSearchTodo.bind(this);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    
    // Initial state
    this.state = {
      showCompleted: false,
      searchText: '',
      todos: [],
    };

  };

  /* 
  * Redirect if user is not logged in */
  componentWillMount() {
    // Check login state
    if (!AuthAPI.isLoggedIn()) {
      hashHistory.push('/login');
    } else {
      TodoAPI.registerStorage(AuthAPI.getCurrentUserId());
      this.setState({
        showCompleted: false,
        searchText: '',
        todos: TodoAPI.getTodos(),
      });
    }  
  };

  /* 
  * Save new Todos to local storage when the component was updated 
  * 
  * This method has some problems with tests: todos is not defined
  * How to fix it? */
  componentDidUpdate() {
    TodoAPI.setTodos(this.state.todos);
  };

  /* 
  * This function handle search Todo */
  handleSearchTodo(_showCompleted, _searchText) {
    this.setState({
      showCompleted: _showCompleted,
      searchText: _searchText
    });
  };

  /*
  * This function handle new Todo input */
  handleNewTodo(_newTodoText) {
    // Get old todos array
    var oldTodos = this.state.todos;
    // Push new todo to todos array
    this.setState({
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
  };

  /* 
  * This function handle delete todo by it's id */
  handleDeleteTodo(_id) {
    // Check if delete is success
    if (TodoAPI.deleteTodoById(_id)) {
      // Set the new state
      this.setState({todos: TodoAPI.getTodos()});
      console.log('Delete success');
    } else {
      console.log('Delete failed');
    }
  };

  /* 
  * Handle toggle todos */
  handleToggle(_id) {
    // Update the Todos array
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === _id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }
      return todo;
    });
    // Set the new state
    this.setState({todos: updatedTodos});
  };

  /* Render the component */
  render() {
    // Get values
    var {todos, showCompleted, searchText} = this.state;

    // Filtered list
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return ( 
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            <TodoSearch onSearch={this.handleSearchTodo} />
            <TodoList 
              todoList={filteredTodos}
              onToggle={this.handleToggle} 
              onDeleteClick={this.handleDeleteTodo} 
            />
            <AddTodo onNewTodo={this.handleNewTodo} />
          </div>
        </div>
      </div>
    );
  };
};

/* 
* Export the component */
export default TodoApp;