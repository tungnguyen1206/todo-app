/* 
* Require React and react-dom */
import React from 'react';
import ReactDOM from 'react-dom';

/* 
* Require react router
* This use Destructuring assignment
* Reference:
*   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment */
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

/* 
* Load bootstrap && jQuery && open-iconic */
import './libs/index';

/* 
* Load our custom style */
import './styles/index';

/* 
* Require components */
import Main from'./components/Main';
import Welcome from'./components/Welcome/Welcome';
import TodoApp from'./components/TodoHome/TodoApp';
import TodoDetails from'./components/TodoDetails/TodoDetails';
import Login from'./components/Authentication/Login/Login';
import Register from'./components/Authentication/Register/Register';

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