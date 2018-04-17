/* 
* Require jQuery */
var $ = require('jquery');

/* 
* This API is used to store and retrieve array of data from local storage
* module.exports is an object
* */
var TodoAPI = new (function() {

  // Avoid 'this'
  var _TodoAPI = this;

  // This variable store identifier, for multiple user
  var registeredName = undefined;

  // This variable store all todos of user
  var todos = [];

  /* 
  * Private method: load todos if it hasn't loaded */
  var loadTodos = function() {
    // Check if the storage is registered
    if (typeof registeredName === 'string' && registeredName.length > 0) {
      // Check if the todos has loaded
      if (todos.length === 0) {
        var stringTodos = localStorage.getItem(registeredName);
        var _todos = [];
        
        // Handling errors
        try {
          _todos = JSON.parse(stringTodos);
        } catch (e) {
          console.log(e);
        }
        
        // Check the result
        if ($.isArray(_todos)) {
          todos = _todos;
          return true;
        } else {
          todos = [];
          return false;
        }
      // Todos has loaded, return true
      } else {
        return true;
      }
    // Storage has not registered yet, return false
    } else {
      return false;
    }
  };

  /* 
  * Private method: save todos from RAM to localStorage */
  var saveTodos = function() {
    // Check if the storage is registered
    if (typeof registeredName === 'string' && registeredName.length > 0) {
      localStorage.setItem(registeredName, JSON.stringify(todos));
      return true;
    // Storage has not registered yet, return false
    } else {
      return false;
    }
  };

  /* 
  * Register to use localStorage */
  _TodoAPI.registerStorage = function(_storageName) {
    // Checking valid input
    if (typeof _storageName === 'string' && _storageName.length > 0) {
      registeredName = _storageName;
    } else {
      registeredName = undefined;
    }
  };


  /* 
  * Logout from localStorage */
  _TodoAPI.logoutStorage = function() {
    registeredName = undefined;
    todos = [];
  };

  /* 
  * Set todos to local storage */
  _TodoAPI.setTodos = function(_todos) {
    if ($.isArray(_todos)) {
      // Update to RAM
      todos = _todos;
      // Save to localStorage
      if(saveTodos()) {
        return _todos;
      } else {
        return null;
      }
    } else {
      return null;
    }

  };

  /* 
  * Get todo from local storage */
  _TodoAPI.getTodos = function() {
    // Check if load successful
    if (loadTodos()) {
      return todos;
    } else {
      return [];
    }
  };

  /* 
  * Filt todos array result */
  _TodoAPI.filterTodos = function(_todos, _showCompleted, _searchText) {
    if ($.isArray(_todos)) {

      var filteredTodos = _todos;

      /* 
      * Filter by showCompleted 
      * 
      * This use Array.prototype.filter()
      * 
      * filter() calls a provided callback function once for each element
      * in an array, and constructs a new array of all the values for which
      * callback returns a value that coerces to true. callback is invoked 
      * only for indexes of the array which have assigned values; it is not 
      * invoked for indexes which have been deleted or which have never been 
      * assigned values. Array elements which do not pass the callback test 
      * are simply skipped, and are not included in the new array.
      * 
      * More informations: 
      *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
      filteredTodos = filteredTodos.filter((todo) => {
        return _showCompleted || (!todo.completed);
      });

      /* 
      * Filter by searchText 
      * 
      * This use RegExp.prototype.test(): 
      * 
      * The test() method executes a search for a match between a regular
      * expression and a specified string. Returns true or false.
      * 
      * More informations: 
      *    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test */
      filteredTodos = filteredTodos.filter((todo) => {
        if (_searchText.length === 0) {
          // Always return true if have no searchText
          return true;
        } else {
          // This variable contain regular expression
          var regExp;
          try {
            // New regular expression, with 'i' modifier - case insensitive
            regExp = new RegExp(_searchText, 'i');
            // Return test result
            return regExp.test(todo.text);
          } catch (error) {
            // Catching error when user typed wrong regular expression
            console.log(error);
            return true;
          }
        }
      });

      /* 
      * Sort todos with non-completed first
      * 
      * This use Array.prototype.sort()
      * 
      * The sort() method sorts the elements of an array in place and returns
      * the array. The sort is not necessarily stable. The default sort order
      * is according to string Unicode code points. 
      * 
      * More informations: 
      *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
      filteredTodos = filteredTodos.sort((todoA, todoB) => {
        return todoA.completed - todoB.completed;
      });



      return filteredTodos;
    
    // Invalid todos array input
    } else {
      return null;
    }
  };

  /* 
  * Find todo with specific id */
  _TodoAPI.getTodoById = function(_id) {
    // Check if the _id parameter is valid
    if (typeof _id === 'string') {

      // Get list of todos: an array
      if (loadTodos()) {
        // Check if the array is empty
        if (todos.length > 0) { 
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
          return todos.find((_todo) => {
            return (_todo.id === _id);
          });
          
        } else {
          // Return undefined if the array is empty
          return undefined;
        }        
      } else {
        return undefined;
      }

    // if the _id parameter is invalid
    } else {
      return undefined;
    }
  };

  /* 
  * Find todo with specific id and update its value */
  _TodoAPI.updateTodoById = function(_id, _newTodo) {
    // Check if the parameters is valid
    if (typeof _id === 'string' && typeof _newTodo === 'object') {
      // Get list of todos: an array
      if (loadTodos()) {
        // Check if the data array is empty
        if (todos.length > 0) { 
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
          var needToUpdate = todos.findIndex((_todo) => {
            return (_todo.id === _id);
          });
          
          // Update the element
          todos[needToUpdate] = _newTodo;
          
          // Set data back to localStorage
          saveTodos();
          return todos[needToUpdate];

        // if todos array is empty
        } else {
          return undefined;
        }
      // If load todos failed
      } else {
        return undefined;
      }

      
    }
  };

  /* 
  * Delete todo by it's id */
  _TodoAPI.deleteTodoById = function(_id) {
    // Check if the _id parameter is valid
    if (typeof _id === 'string') {

      // Get list of todos: an array
      if (loadTodos()) {
        // Check if the array is empty
        if (todos.length > 0) { 
          /* 
          * Find in array and get the index of first match result
          * 
          * This use Array.prototype.findIndex()
          * 
          * The findIndex() method returns the index of the first element in the array 
          * that satisfies the provided testing function. Otherwise -1 is returned.
          * 
          * More informations: 
          *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex */
          var indexOfDelete = todos.findIndex((_todo) => {
            return (_todo.id === _id);
          });

          /* 
          * Remove element form array using splice() method
          * 
          * The splice() method changes the contents of an array 
          * by removing existing elements and/or adding new elements. 
          * 
          * More informations: 
          *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice */
          if (indexOfDelete > -1) {
            // From indexOfDelete, delete one element 
            todos.splice(indexOfDelete, 1);
            // Update to localStorage
            saveTodos();
            return true;
          // Element not found
          } else {
            return false;
          }
          
        } else {
          // Return false if the array is empty
          return false;
        }        
      } else {
        return false;
      }

    // if the _id parameter is invalid
    } else {
      return false;
    }
  };

})();

/* 
* Export the module */
module.exports = TodoAPI;