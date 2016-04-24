
var dinnerPlannerApp = angular.module('dinnerPlanner', ['ngRoute','ngResource', 'ngCookies', 'ngDragDrop', 'ngAnimate', 'ui.bootstrap']);


dinnerPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/newGame', {
        templateUrl: 'partials/newGame.html',
        controller: 'NewGameCtrl'
      }).
      when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'GameCtrl'
      }).
      when('/result', {
        templateUrl: 'partials/result.html',
        controller: 'ResultCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

//Makes sure the user is authenticated to be a specific location/path.
dinnerPlannerApp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth, $cookieStore) {
    $rootScope.$on('$routeChangeStart', function (event) {
        console.log($location.$$path);
        try{
          var multiplayer = $cookieStore.get('multPlayer');
        }catch(err){
          var multiplayer = false;
        }
        if (!Auth.isLoggedIn() && $location.$$path != "/home" && multiplayer === false) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/home');
        }
        else {
            console.log('ALLOW');
        }
    });
}]);

//load fb sdk, set up db api and the Auth service
dinnerPlannerApp.run(['$rootScope', '$window', 'Auth',
  function($rootScope, $window, Auth) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {

    FB.init({ 

      appId: '1042588039140495', 
      channelUrl: 'app/channel.html', 
      status: true, 
      cookie: true, 
      xfbml: true 
    });

    Auth.watchAuthenticationStatusChange();

  };

  (function(d){
    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);
  }(document));

}]);