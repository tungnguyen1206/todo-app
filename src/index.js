/* 
* Require React and react-dom */
var React = require('react');
var ReactDOM = require('react-dom');

/* 
* Require react router
* This use Destructuring assignment
* Reference:
*   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment */
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

/* 
* Load bootstrap && jQuery && open-iconic */
require('./libs/index');

/* 
* Load our custom style */
require('./styles/index')

/* 
* Require components */
var Main = require('./components/Main');
var Welcome = require('./components/Welcome/Welcome');
var TodoApp = require('./components/TodoHome/TodoApp');
var TodoDetails = require('./components/TodoDetails/TodoDetails');
var Login = require('./components/Authentication/Login/Login');
var Register = require('./components/Authentication/Register/Register');

/* Render component to DOM emement */
ReactDOM.render(
  /* 
  * To do routing:
  *   1. Create the path and route to component
  *   2. Create the component in components folder
  *   3. Require the component in our app
  */
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="todos" component={TodoApp}/> 
      <Route path="todos/:todoid" component={TodoDetails}/> 
      <Route path="login" component={Login}/> 
      <Route path="register" component={Register}/>
      <IndexRoute component={Welcome}/>
    </Route>
  </Router>,
  document.getElementById('app')
);  