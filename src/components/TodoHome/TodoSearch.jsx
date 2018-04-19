/* 
* Require react */
import React from 'react';

/* 
* Define TodoSearch component */
class TodoSearch extends React.Component {
  /* 
  * Constructor */
  constructor(props) {
    super(props);

    // Bind handle event methods to this component
    this.handleSearch = this.handleSearch.bind(this);

  };

  /* 
  * This function handle searching input */
  handleSearch() {
    // Get data from inputs
    var showCompleted = this.showCompleted.checked;
    var searchText = this.searchText.value;

    // Push data up
    this.props.onSearch(showCompleted, searchText);
  };

  /* Render the component */
  render() {
    return (
      <div className="container-header">

        <div>
          <input 
            ref={(thisRef) => {this.searchText = thisRef;}}
            type="search" 
            className="search-todos form-control"
            placeholder="Search todos" 
            onChange={this.handleSearch}
          />
        </div>

        <div className="show-completed">
          <input  
            ref={(thisRef) => {this.showCompleted = thisRef;}}
            id="showCompletedCheckbox"
            type="checkbox"
            onChange={this.handleSearch}
          />
          <label htmlFor="showCompletedCheckbox">
            Show completed todos
          </label>
        </div>

      </div>
    );
  };
};

/* 
* Export the component */
export default TodoSearch;