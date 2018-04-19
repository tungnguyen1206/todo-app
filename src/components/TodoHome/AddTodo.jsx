/* 
* Require react */
import React from 'react';

/* 
* AddTodo definition */
class AddTodo extends React.Component {

  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.onFormSubmit = this.onFormSubmit.bind(this);

  };

  /* 
  * Handle form submit */
  onFormSubmit(e) {
    e.preventDefault();

    // Get value from input
    var texts = this.todotexts.value;

    // Checking input
    if (typeof texts === 'string' && texts.length > 0) {
      // Clean input box
      this.todotexts.value = '';
      // Push data up
      this.props.onNewTodo(texts);
    }    
  };

  /* 
  * Render the component */
  render() {   
    return(
      <div className="container-footer">
        <form ref="form" className="add-todo" onSubmit={this.onFormSubmit}>
          <input  
            ref={(thisRef) => {this.todotexts = thisRef;}}
            type="text" 
            className="add-todo-text form-control" 
            placeholder="Enter your note"
          />

          <button 
            type="submit" 
            className="add-todo-button btn btn-block btn-primary"
          >
            Add Todo
          </button>
        </form>
      </div>
    );
  };
};


/* 
* Export the component */
export default AddTodo;