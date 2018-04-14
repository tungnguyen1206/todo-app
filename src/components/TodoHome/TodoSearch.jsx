/* 
* Require react */
var React = require('react');

/* 
* Define TodoSearch component */
var TodoSearch = React.createClass({

  /* 
  * This function handle searching input */
  handlingSearch: function() {
    // Get data from inputs
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;

    // Push data up
    this.props.onSearch(showCompleted, searchText);
  },

  /* Render the component */
  render: function() {
    return (
      <div className="container-header">
        <div>
          <input ref="searchText"
                 type="search" 
                 className="search-todos form-control"
                 placeholder="Search todos" 
                 onChange={this.handlingSearch}/>
        </div>
        <div className="show-completed">
          <input  ref="showCompleted"
                  id="showCompletedCheckbox"
                  type="checkbox"
                  onChange={this.handlingSearch}/>
          <label htmlFor="showCompletedCheckbox">Show completed todos</label>
        </div>
      </div>
    );
  }
});

/* 
* Export the component */
module.exports = TodoSearch;