/* 
* Require react */
var React = require('react');

/* 
* AddTodo definition */
var AddTodo = React.createClass({
  // Handling form submit
  onFormSubmit: function(e) {
    e.preventDefault();

    // Avoid 'this'
    var _AddTodo = this;

    // Get value from input
    var texts = _AddTodo.refs.todotexts.value;

    // Checking input
    if (typeof texts === 'string' && texts.length > 0) {
      // Clean input box
      _AddTodo.refs.todotexts.value = '';
      // Push data up
      _AddTodo.props.onNewTodo(texts);
    }    
  },

  render: function() {
    // Avoid 'this'
    var _AddTodo = this;    

    return(
      <div className="container-footer">
        <form ref="form" className="add-todo" onSubmit={_AddTodo.onFormSubmit}>
          <input  ref="todotexts" 
                  type="text" 
                  className="add-todo-text form-control" 
                  placeholder="Enter your note"/>
          <button type="submit" 
                  className="add-todo-button btn btn-block btn-primary">Add Todo</button>
        </form>
      </div>
    );
  }
});


/* 
* Export the component */
module.exports = AddTodo;