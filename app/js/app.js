
var weGeoQuizApp = angular.module('weGeoQuiz', ['ngRoute','ngResource', 'ngCookies', 'ngDragDrop', 'ngAnimate', 'ui.bootstrap']);


weGeoQuizApp.config(['$routeProvider',
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
weGeoQuizApp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {


    $rootScope.$on('$routeChangeStart', function (event) {
        console.log($location.$$path);
         
         var multiplayer = Auth.getCookie();
         console.log("JAA" +  multiplayer);
        
        if (!Auth.isLoggedIn() && $location.$$path != "/home" && multiplayer == false) {
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
weGeoQuizApp.run(['$rootScope', '$window', 'Auth',
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









