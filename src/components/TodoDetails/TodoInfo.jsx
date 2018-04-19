/* 
* Require react */
import React from 'react';

/* 
* Require moment */
import moment from 'moment';

/* 
* Defining component */
class TodoInfo extends React.Component {

  formatTimeStamp(_timeStamp) {
    // Check if the _timeStamp is a number
    if (typeof _timeStamp === 'number') {
      return moment.unix(_timeStamp).format('hh:mm A - MMMM Do, YYYY');
    } else {
      return undefined;
    }
  };

  /* 
  * Render the component */
  render() {

    // Get value from props
    var {id, text, completed, createdAt, completedAt} = this.props.todo;

    return (
      <div className="info-list">

        <div className="row">
          <div className="col-xs-3 col-md-3 offset-1">
            <p>ID:</p>
          </div>
          <div className="col-xs-7 col-md-7">
            <p>{id}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 col-md-3 offset-1">
            <p>Todo Name:</p>
          </div>
          <div className="col-xs-7 col-md-7">
            <p>{text}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 col-md-3 offset-1">
            <p>Created at:</p>
          </div>
          <div className="col-xs-7 col-md-7">
            <p>{this.formatTimeStamp(createdAt)}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 col-md-3 offset-1">
            <p>Status:</p>
          </div>
          <div className="col-xs-7 col-md-7">
            <p>
              {
                completed 
                ? `Completed at ${this.formatTimeStamp(completedAt)}` 
                : 'Uncompleted'
              }
            </p>
          </div>
        </div>

      </div>
    );
  };
};

/* 
* Export the component */
export default TodoInfo;