/* 
* Require jQuery */
import $ from 'jquery';

/* 
* This API is used to store and retrieve array of data from local storage
* module.exports is an object
* */
let TodoAPI = new (class {

  /* 
  * Class constructor */
  constructor() {
    // This variable store identifier, for multiple user
    this.registeredName = undefined;

    // This variable store all todos of user
    this.todos = [];

    // Bind for all methods
    this.loadTodos = this.loadTodos.bind(this);
    this.saveTodos = this.saveTodos.bind(this);

    this.registerStorage = this.registerStorage.bind(this);
    this.logoutStorage = this.logoutStorage.bind(this);

    this.getTodos = this.getTodos.bind(this);
    this.setTodos = this.setTodos.bind(this);
    this.filterTodos = this.filterTodos.bind(this);

    this.getTodoById = this.getTodoById.bind(this);
    this.updateTodoById = this.updateTodoById.bind(this);
    this.deleteTodoById = this.deleteTodoById.bind(this);
  };


  /* 
  * Private method: load todos if it hasn't loaded */
  loadTodos() {
    // Check if the storage is registered
    if (typeof this.registeredName === 'string' && this.registeredName.length > 0) {
      // Check if the todos has loaded
      if (this.todos.length === 0) {
        var stringTodos = localStorage.getItem(this.registeredName);
        var _todos = [];
        
        // Handling errors
        try {
          _todos = JSON.parse(stringTodos);
        } catch (e) {
          console.log(e);
        }
        
        // Check the result
        if ($.isArray(_todos)) {
          this.todos = _todos;
          return true;
        } else {
          this.todos = [];
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
  saveTodos() {
    // Check if the storage is registered
    if (typeof this.registeredName === 'string' && this.registeredName.length > 0) {
      localStorage.setItem(this.registeredName, JSON.stringify(this.todos));
      return true;
    // Storage has not registered yet, return false
    } else {
      return false;
    }
  };

  /* 
  * Register to use localStorage */
  registerStorage(_storageName) {
    // Checking valid input
    if (typeof _storageName === 'string' && _storageName.length > 0) {
      this.registeredName = _storageName;
    } else {
      this.registeredName = undefined;
    }
  };


  /* 
  * Logout from localStorage */
  logoutStorage() {
    this.registeredName = undefined;
    this.todos = [];
  };

  /* 
  * Set todos to local storage */
  setTodos(_todos) {
    if ($.isArray(_todos)) {
      // Update to RAM
      this.todos = _todos;
      // Save to localStorage
      if(this.saveTodos()) {
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
  getTodos() {
    // Check if load successful
    if (this.loadTodos()) {
      return this.todos;
    } else {
      return [];
    }
  };

  /* 
  * Filt todos array result */
  filterTodos(_todos, _showCompleted, _searchText) {
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
  getTodoById(_id) {
    // Check if the _id parameter is valid
    if (typeof _id === 'string') {

      // Get list of todos: an array
      if (this.loadTodos()) {
        // Check if the array is empty
        if (this.todos.length > 0) { 
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
          return this.todos.find((_todo) => {
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
  updateTodoById(_id, _newTodo) {
    // Check if the parameters is valid
    if (typeof _id === 'string' && typeof _newTodo === 'object') {
      // Get list of todos: an array
      if (this.loadTodos()) {
        // Check if the data array is empty
        if (this.todos.length > 0) { 
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
          var needToUpdate = this.todos.findIndex((_todo) => {
            return (_todo.id === _id);
          });
          
          // Update the element
          this.todos[needToUpdate] = _newTodo;
          
          // Set data back to localStorage
          this.saveTodos();
          return this.todos[needToUpdate];

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
  deleteTodoById(_id) {
    // Check if the _id parameter is valid
    if (typeof _id === 'string') {

      // Get list of todos: an array
      if (this.loadTodos()) {
        // Check if the array is empty
        if (this.todos.length > 0) { 
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
          var indexOfDelete = this.todos.findIndex((_todo) => {
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
            this.todos.splice(indexOfDelete, 1);
            // Update to localStorage
            this.saveTodos();
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
export default TodoAPI;