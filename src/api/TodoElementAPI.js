/* 
* Require TodoListAPI */
var TodoListAPI = require('./TodoListAPI');


/* 
* This API is used to get and update a todo by it's id
* */
var TodoElementAPI = {
  /* 
  * Find todo with specific id */
  getTodoById: function(_id) {
    // Check if the _id parameter is valid
    if (typeof _id === 'string') {
      // Get list of todos: an array
      var _todos = TodoListAPI.getTodos();
      
      // Check if the array is empty
      if (_todos.length > 0) { 
        /* 
        * Find in array and get the first match result
        * 
        * This use Array.prototype.find()
        * 
        * The find() method returns the value of the first element in the array
        * that satisfies the provided testing function. Otherwise undefined is returned.
        * 
        * More informations: 
        *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find */
        return _todos.find((_todo) => {
          return (_todo.id === _id);
        });
        
      } else {
        // Return undefined if the array is empty
        return undefined;
      }        
    // if the _id parameter is invalid
    } else {
      return undefined;
    }
  },
    
    
  /* 
  * Find todo with specific id and update its value */
  updateTodoById: function(_id, _newTodo) {
    // Check if the parameters is valid
    if (typeof _id === 'string' && typeof _newTodo === 'object') {
      // Get list of todos: an array
      var _todos = TodoListAPI.getTodos();

      // Check if the array is empty
      if (_todos.length > 0) { 
        /* 
        * Find in array and get the index of first match result
        * 
        * This use Array.prototype.findIndex()
        * 
        * The findIndex() method returns the index of the first element in the array 
        * that satisfies the provided testing function. Otherwise -1 is returned.
        * 
        * More informations: 
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex */
        var needToUpdate = _todos.findIndex((_todo) => {
          return (_todo.id === _id);
        });
        
        // Update the element
        _todos[needToUpdate] = _newTodo;
        
        // Set data back to localStorage
        TodoListAPI.setTodos(_todos);
      } 
      return _todos;
    }
  },
};


/* Export the API */
module.exports = TodoElementAPI;