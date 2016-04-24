dinnerPlannerApp.factory('Auth', function($rootScope, $cookieStore){
var user;

this.multiplayer = false;
this.loggedIn = false;

this.init = function(){
	$cookieStore.put("multiplayer", this.multiplayer);
}
this.init();

//sets global variable users and sets loggedin status too true
setUser = function(aUser){
	user = aUser;
	this.loggedIn = true;
}

//Returns a user if logged in else false
this.isLoggedIn = function(aUser){
	return(user)? user : false;
}

//When we log in/out from facebook with callback
this.watchAuthenticationStatusChange = function() {
	FB.Event.subscribe('auth.authResponseChange', function(res) {
		if (res.status === 'connected') {
		  this.getUserInfo();
		  setUser(res.authResponse);
		  notifyHomeCtrl(true);
		} 
		else {
			notifyHomeCtrl("");
			setUser(false);
		}
	});
}

this.getCookie = function(){
	try{
	return $cookieStore.get("multiplayer");
	}catch(err){
		return false;
	}
}

//Only when we are logged in we will show the toplist and start-play button, thats why we apply observer pattern
//using the array and 2 following methods. We also have a function setLoggedIn in the homecontroller which is added to the array (observerbles)
var views = [];

this.addObservable = function(view){
	views.push(view);
}

notifyHomeCtrl = function(loggedIn){
	for (var i = 0; i < views.length; ++i ){
		views[i].setLoggedIn(loggedIn);
	}
}

//get an authenticated users information and stores it in the variable Auth.user
getUserInfo = function() {
	var _self = this;
	FB.api('/me', function(res) {
		$rootScope.$apply(function() { 
     		$rootScope.user = _self.user = res; 
     	});
	});
}

return this;
})