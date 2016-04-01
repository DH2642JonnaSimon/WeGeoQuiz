
var dinnerPlannerApp = angular.module('dinnerPlanner', ['ngRoute','ngResource', 'ngCookies']);


dinnerPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/newGame', {
        templateUrl: 'partials/newGame.html',
        controller: 'newGameCtrl'
      }).
      when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'gameCtrl'
      }).
      when('/result', {
        templateUrl: 'partials/result.html',
        controller: 'resultCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);