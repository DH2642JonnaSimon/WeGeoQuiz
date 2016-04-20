dinnerPlannerApp.factory('Auth', function($rootScope){
var user;

setUser = function(aUser){
	user = aUser;
}

this.isLoggedIn = function(aUser){
	return(user)? user : false;
}

this.watchAuthenticationStatusChange = function() {

	FB.Event.subscribe('auth.authResponseChange', function(res) {

	if (res.status === 'connected') {
	  
	  /* 
	   The user is already logged, 
	   is possible retrieve his personal info
	  */
	  console.log('LOGGED IN' + res.authResponse);
	  this.getUserInfo();
	  setUser(res.authResponse);

	  /*
	   This is also the point where you should create a 
	   session for the current user.
	   For this purpose you can use the data inside the 
	   res.authResponse object.
	  */

	} 
	else {
		console.log('NOT LOGGED IN');
		setUser(false);

	  /*
	   The user is not logged to the app, or into Facebook:
	   destroy the session on the server.
	  */
	   
	}

	});

}

getUserInfo = function() {

  var _self = this;

  FB.api('/me', function(res) {

    $rootScope.$apply(function() { 
    	console.log(res);
      $rootScope.user = _self.user = res; 

    });

  });

}

this.logout = function() {

  var _self = this;

  FB.logout(function(response) {

    $rootScope.$apply(function() { 

      $rootScope.user = _self.user = {}; 

    }); 

  });

}

return this;

})