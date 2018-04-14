/* 
* Require react */
var React = require('react');

/* 
* Require components */
var Nav = require('./Nav');

/* 
* Define Main component
*
* This use Stateless Functional Component 
* For more information:
*   https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541 */
var Main = (props) => {
  return ( 
    <div>
      <Nav/>
      {// Specify where to render the child component
        props.children
      }
    </div>
  );
};

/* 
* Export the component */
module.exports = Main;