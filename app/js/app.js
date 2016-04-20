
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

dinnerPlannerApp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        console.log();
        if (!Auth.isLoggedIn() && $location.$$path != "/home") {
            console.log('DENY');
            event.preventDefault();
            $location.path('/home');
        }
        else {
            console.log('ALLOW');
        }
    });
}]);

dinnerPlannerApp.run(['$rootScope', '$window', 'Auth',
  function($rootScope, $window, Auth) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({ 

      /* 
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ ) 
      */

      appId: '1042588039140495', 

      /* 
       Adding a Channel File improves the performance 
       of the javascript SDK, by addressing issues 
       with cross-domain communication in certain browsers. 
      */

      channelUrl: 'app/channel.html', 

      /* 
       Set if you want to check the authentication status
       at the start up of the app 
      */

      status: true, 

      /* 
       Enable cookies to allow the server to access 
       the session 
      */

      cookie: true, 

      /* Parse XFBML */

      xfbml: true 
    });

    Auth.watchAuthenticationStatusChange();

  };

  // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

  (function(d){
    // load the Facebook javascript SDK

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