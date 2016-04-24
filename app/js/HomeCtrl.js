
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game, $http, Auth, API) {

$scope.numOfPlayers = 1;

Auth.multiplayer = false;

$scope.num= 1;

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
    Auth.multiplayer = false;
    $scope.multiplayerMode = false;
    $scope.singleplayerMode = false;
}

$scope.activateAPI = function(){
	API.initMap();

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