/* 
* Require jQuery */
var $ = require('jquery');

/* 
* This API is used to store and retrieve array of data from local storage
* module.exports is an object
* */
var TodoListAPI = {
  /* 
  * Save todo to local storage */
  setTodos: function(_todos) {
    if ($.isArray(_todos)) {
      localStorage.setItem('todos', JSON.stringify(_todos));
      return _todos;
    }
  },

  /* 
  * Get todo from local storage */
  getTodos: function() {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    // Handling errors
    try {
      var todos = JSON.parse(stringTodos);
    } catch (e) {
      console.log(e);
    }

    // Check the result
    if ($.isArray(todos)) {
      return todos;
    } else {
      return [];
    }

  },

  /* 
  * Filt todos array result */
  filterTodos: function(_todos, _showCompleted, _searchText) {
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
          // New regular expression, with 'i' modifier
          var regExp = new RegExp(_searchText, 'i');
          // Return test result
          return regExp.test(todo.text);
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
    }
  },
};

/* 
* Export the module */
module.exports = TodoListAPI;