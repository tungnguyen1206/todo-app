/* 
* Require jQuery */
import $ from 'jquery';

/* 
* Require crypto */
import crypto from 'crypto';

/* 
* Require node-uuid */
import uuid from 'node-uuid';

/* 
* This API is used for app authentication
* Including: login, register, logout, check login state */
let AuthAPI = new (class {
  /* 
  * Class constructor */
  constructor() {
    // All user data
    this.users = [];

    // Bind for all methods
    this.loadData = this.loadData.bind(this);
    this.saveData = this.saveData.bind(this);

    this.isExist = this.isExist.bind(this);

    this.findUser = this.findUser.bind(this);
    this.findUserById = this.findUserById.bind(this);

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.getCurrentUserId = this.getCurrentUserId.bind(this);
    this.getCurrentUserName = this.getCurrentUserName.bind(this);

    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  };
  
  /* 
  * Get user data from localStorage */
  loadData() {
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
  saveData(_users) {
    if ($.isArray(_users)) {
      localStorage.setItem('users', JSON.stringify(_users));
      return _users;
    }
  };


  /* 
  * Check if the username is existed */
  isExist(_username) {
    // Check if the data array is loaded
    if (this.users.length === 0) {
      this.users = this.loadData();
    }

    /* 
    * Use: Array.prototype.some()
    * 
    * The some() method tests whether at least one element in 
    * the array passes the test implemented by the provided function.
    * 
    * More: 
    *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some */
    return this.users.some((_user) => {
      return _user.username === _username;
    });
  };


  /* 
  * Find user by username */
  findUser(_username) {
    // Check if the data array is loaded
    if (this.users.length === 0) {
      this.users = this.loadData();
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
    return this.users.find((_user) => {
      return _user.username === _username;
    });
  };

  /* 
  * Find user by username */
  findUserById(_id) {
    // Check if the data array is loaded
    if (this.users.length === 0) {
      this.users = this.loadData();
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
    return this.users.find((_user) => {
      return _user.id === _id;
    });
  };


  /* 
  * Check if user is logged in */
  isLoggedIn() {
    return !(localStorage.getItem('currentUser') === null);
  };


  /* 
  * Get current user id */
  getCurrentUserId() {
    return localStorage.getItem('currentUser');
  };

  /* 
  * Get current username */
  getCurrentUserName() {
    
    // Find id and user
    var currentUserId = this.getCurrentUserId();
    var currentUser = this.findUserById(currentUserId);

    // Checking found result
    if (typeof currentUser === 'object') {
      return currentUser.username;
    } else {
      return undefined;
    }
  };


  /* 
  * Logout for user by delete currentUser information */
  logout() {
    localStorage.removeItem('currentUser');
  };


  /* 
  * Register for user */
  register(_user) {
    if (typeof _user.username === 'string') {

      // Trim the username
      _user.username = _user.username.trim();  

      // Check if the _user parameter is valid
      if (_user.username.length > 0 && _user.password.length > 0) {
        // Check if the username is existed
        if (!this.isExist(_user.username)) {
          // Check if the data array is loaded
          if (this.users.length === 0) {
            this.users = this.loadData();
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
          this.users.push(newUser);
          
          // Save new data to localStorage
          this.saveData(this.users);
          
          return true;
          
        // The username is existed
        } else {
          return false;
        }

      // Invalid input
      } else {
        return false;
      }

    // username is not a string
    } else {
      return false;
    }
  }

  /* 
  * Login for user */
  login(_user) {

    if (typeof _user.username === 'string') {
      // Trim the username
      _user.username = _user.username.trim();

      // Check if the _user parameter is valid
      if (_user.username.length > 0 && _user.password.length > 0) {
        // Find user in data
        var user = this.findUser(_user.username);

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

    // if username is not a string 
    } else {
      return false;
    }

      
  }
})();


/* 
* Export the API */
export default AuthAPI;