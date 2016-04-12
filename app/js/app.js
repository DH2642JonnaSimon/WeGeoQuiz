
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