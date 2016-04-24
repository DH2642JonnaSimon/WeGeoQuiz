
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game, $http, Auth, API) {

$scope.numOfPlayers = 1;

Auth.multiplayer = false;
Auth.addObservable(this);

//set's number of players in multiplayer mode, it was a design choice to put this function on this routing location

$scope.num= 1;

$scope.setNumOfPlayers = function(number){
    Game.setNumOfPlayers(number);
    $scope.numOfPlayers = number;
  }

//Get's number of players in multiplayer mode, it was a design choice to put this function on this routing location
$scope.getNumOfPlayers = function() {
    this.num = Game.getNumOfPlayers();
    return new Array(this.num); 
}

//The 2 following scopevariable and 3 methods make sure that the player can play without having to log in if he plays multiplayer, have to log in if he plays single player, they keep track of the pages current state. 
$scope.multiplayerMode = false;
$scope.singleplayerMode = false;

$scope.multiplayer = function(){
    $scope.multiplayerMode = true;
    Auth.multiplayer = true;
    $cookieStore.put("multiplayer", Auth.multiplayer);
}

$scope.singleplayer = function(){
    $scope.singleplayerMode = true;
}

$scope.back = function(){
    Auth.multiplayer = false;
    $scope.multiplayerMode = false;
    $scope.singleplayerMode = false;
    $cookieStore.put("multiplayer", Auth.multiplayer);
}

$scope.activateAPI = function(){
	API.initMap();
// Här ska jag få put väderID :P

}

//used as an observerfunction to change the logged in status when logging in/out from facebook api, 1 view is dependent on this as of yet
this.setLoggedIn = function(loggedIn){
    $scope.$apply(function(){
            $scope.loggedIn = loggedIn; 
    });
}


$scope.deleteAddRow = function($event){
    var id = $event.currentTarget.id;
    $scope.num = Game.getNumOfPlayers();
    var num = $scope.num;

    if(id === "decreaseArr" && num === 1){
        $scope.num = Game.getNumOfPlayers();

    }else if(id === "decreaseArr" && num > 1){
        $scope.num = $scope.num-=1;
        Game.setNumOfPlayers($scope.num);

    }else if(id === "increaseArr"){
        $scope.num = $scope.num+=1;
        Game.setNumOfPlayers($scope.num);
    }   
    return $scope.num;  
}


});