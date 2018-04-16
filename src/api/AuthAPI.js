/* 
* Require jQuery */
var $ = require('jquery');

/* 
* Require crypto */
var crypto = require('crypto');

/* 
* Require node-uuid */
var uuid = require('node-uuid');

/* 
* This API is used for app authentication
* Including: login, register, logout, check login state */
var AuthAPI = new (function() {

  // Avoid 'this'
  var _AuthAPI = this;

  // All user data
  var users = [];
  
  /* 
  * Get user data from localStorage */
  var loadData = function() {
    var stringUsers = localStorage.getItem('users');
    var temp_users = [];

    // Handling errors
    try {
      temp_users = JSON.parse(stringUsers);
    } catch (e) {
      console.log(e);
    }

    // Check the result
    if ($.isArray(temp_users)) {
      return temp_users;
    } else {
      return [];
    }
  };

  /* 
  * Save user data to localStorage */
  var saveData = function(_users) {
    if ($.isArray(_users)) {
      localStorage.setItem('users', JSON.stringify(_users));
      return _users;
    }
  };


  /* 
  * Check if the username is existed */
  var isExist = function(_username) {
    // Check if the data array is loaded
    if (users.length === 0) {
      users = loadData();
    }

    /* 
    * Use: Array.prototype.some()
    * 
    * The some() method tests whether at least one element in 
    * the array passes the test implemented by the provided function.
    * 
    * More: 
    *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some */
    return users.some((_user) => {
      return _user.username === _username;
    });
  };


  /* 
  * Find user by username */
  var findUser = function(_username) {
    // Check if the data array is loaded
    if (users.length === 0) {
      users = loadData();
    }

    /* 
    * Find in array and get the first match result
    * 
    * This use Array.prototype.find()
    * 
    * The find() method returns the value of the first element in the array
    * that satisfies the provided testing function. Otherwise undefined is returned.
    * 
    * More informations: 
    *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find */
    return users.find((_user) => {
      return _user.username === _username;
    });
  };

  /* 
  * Find user by username */
  var findUserById = function(_id) {
    // Check if the data array is loaded
    if (users.length === 0) {
      users = loadData();
    }

    /* 
    * Find in array and get the first match result
    * 
    * This use Array.prototype.find()
    * 
    * The find() method returns the value of the first element in the array
    * that satisfies the provided testing function. Otherwise undefined is returned.
    * 
    * More informations: 
    *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find */
    return users.find((_user) => {
      return _user.id === _id;
    });
  };


  /* 
  * Check if user is logged in */
  _AuthAPI.isLoggedIn = function() {
    return !(localStorage.getItem('currentUser') === null);
  };


  /* 
  * Get current user id */
  _AuthAPI.getCurrentUserId = function() {
    return localStorage.getItem('currentUser');
  };

  /* 
  * Get current username */
  _AuthAPI.getCurrentUserName = function() {
    
    // Find id and user
    var currentUserId = _AuthAPI.getCurrentUserId();
    var currentUser = findUserById(currentUserId);

    // Checking found result
    if (typeof currentUser === 'object') {
      return currentUser.username;
    } else {
      return undefined;
    }
  };


  /* 
  * Logout for user by delete currentUser information */
  _AuthAPI.logout = function() {
    localStorage.removeItem('currentUser');
  };


  /* 
  * Register for user */
  _AuthAPI.register = function(_user) {
    // Check if the _user parameter is valid
    if (_user.username.length > 0 && _user.password.length > 0) {
      // Check if the username is existed
      if (!isExist(_user.username)) {
        // Check if the data array is loaded
        if (users.length === 0) {
          users = loadData();
        }
        
        // Create random salt
        var _salt = crypto.randomBytes(16).toString('hex');
        
        // Define new user
        var newUser = {
          id: uuid(),
          username: _user.username,
          hashPassword: crypto.createHash('md5').update(_user.password + _salt).digest('hex'),
          salt: _salt
        };
        
        // Push new user to data array
        users.push(newUser);
        
        // Save new data to localStorage
        saveData(users);

        return true;

      // The username is existed
      } else {
        return false;
      }
    // Invalid input
    } else {
      return false;
    }
  }

  /* 
  * Login for user */
  _AuthAPI.login = function(_user) {
    // Check if the _user parameter is valid
    if (_user.username.length > 0 && _user.password.length > 0) {
      // Find user in data
      var user = findUser(_user.username);

      if (user && typeof user === 'object') {
        // Get salt
        var _salt = user.salt;
        // Calculate the hashPassword 
        var _hashPassword = crypto.createHash('md5').update(_user.password + _salt).digest('hex');
        // Verify the password
        if (user.hashPassword === _hashPassword) {
          localStorage.setItem('currentUser', user.id);
          return true;
        } else {
          return false;
        }
      // If user is not exist
      } else {
        return false;
      }

    // Invalid input
    } else {
      return false;
    }
  }
})();


/* 
* Export the API */
module.exports = AuthAPI;