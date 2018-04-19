/* 
* Require react, react-router */
import React from 'react';
import {hashHistory} from 'react-router';

/* 
* Require moment */
import moment from 'moment';

/* 
* Require components */
import TodoInfo from './TodoInfo';
import TodoControls from './TodoControls';

/* 
* Require APIs */
import TodoAPI from '../../api/TodoAPI';
import AuthAPI from '../../api/AuthAPI';

/* 
* Define Todo component */
class TodoDetails extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onUpdateCompleted = this.onUpdateCompleted.bind(this);

    // Initial state
    this.state = {
      todo: {},
    };
  };

  /* 
  * Redirect if user is not logged in */
  componentWillMount() {
    // Check login state
    if (!AuthAPI.isLoggedIn()) {
      hashHistory.push('/login');
    } else {
      // Register storage
      TodoAPI.registerStorage(AuthAPI.getCurrentUserId());
      // Get id from URL parameter
      var _id = this.props.params.todoid;
      // Init state
      this.setState({
        todo: TodoAPI.getTodoById(_id),
      });
    }  
  };

  /* 
  * Update localStorage with new data before the component unmount */
  componentWillUnmount() {
    var _newTodo = this.state.todo;
    var _id = _newTodo.id;
    TodoAPI.updateTodoById(_id, _newTodo);
  };

  /* 
  * Handle when user clicks on Complete button */
  onUpdateCompleted() {
    // Get old values
    var _oldTodo = this.state.todo;
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
  };


  /* Render the component */
  render() {

    // Get value of state
    var todo = this.state.todo;

    return ( 
      <div>

        <h1 className="page-title">Todo Details</h1>

        <div className="row">
          <div className="container col-xs-10 col-md-6 col-lg-4 col-xs-offset-1 col-md-offset-3 col-lg-offset-4">
            <TodoInfo todo={todo} />
            <TodoControls 
              completedState={todo.completed} 
              onUpdateStatus={this.onUpdateCompleted}
            />
          </div>
        </div>

      </div>
    );
  };
};

/* 
* Export the component */
export default TodoDetails;