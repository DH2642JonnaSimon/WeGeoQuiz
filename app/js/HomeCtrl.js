
<<<<<<< HEAD
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game, $http, Auth) {
=======
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game, API) {
>>>>>>> master
console.log("inne i homectrl")

$scope.numOfPlayers = 1;

Auth.multiplayer = false;

$scope.setNumOfPlayers = function(number){
    Game.setNumOfPlayers(number);
    $scope.numOfPlayers = number;
    //$cookieStore.put('numPlayers', number);
    //$cookieStore.put('guests', number);
  }

$scope.getNumOfPlayers = function() {
    this.num = Game.getNumOfPlayers();
    return new Array(this.num); 
}

<<<<<<< HEAD
$scope.multiplayerMode = false;
$scope.singleplayerMode = false;

$scope.multiplayer = function(){
    $scope.multiplayerMode = true;
    Auth.multiplayer = true;
}

$scope.singleplayer = function(){
    $scope.singleplayerMode = true;
}

$scope.back = function(){
    console.log("HEEJEJEJEJE");
    Auth.multiplayer = false;
    $scope.multiplayerMode = false;
    $scope.singleplayerMode = false;
=======
$scope.activateAPI = function(){
	API.initMap();
	// Dinner.Dish.get({id:$routeParams.dishId},function(data){
		
	// });
>>>>>>> master
}

});