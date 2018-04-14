/* 
* Require react */
var React = require('react');

/* 
* Require moment */
var moment = require('moment');

/* 
* Defining component */
var TodoInfo = React.createClass({

  
  render: function() {
    // Avoid 'this'
    var _TodoInfo = this;

    // Get value from props
    var {id, text, completed, createdAt, completedAt} = _TodoInfo.props.todo;

    var formatTimeStamp = function(_timeStamp) {
      // Check if the _timeStamp is a number
      if (typeof _timeStamp === 'number') {
        return moment.unix(_timeStamp).format('hh:mm A - MMMM Do, YYYY');
      } else {
        return undefined;
      }
    };

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
            <p>{formatTimeStamp(createdAt)}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 col-md-3 offset-1">
            <p>Status:</p>
          </div>
          <div className="col-xs-7 col-md-7">
            <p>{completed ? `Completed at ${formatTimeStamp(completedAt)}` : 'Uncompleted'}</p>
          </div>
        </div>

      </div>
    );
  }
});

/* 
* Export the component */
module.exports = TodoInfo;