
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game) {
console.log("inne i homectrl")

$scope.numOfPlayers = 1;

$scope.setNumOfPlayers = function(number){
  	console.log("Set number of players - controller");
    Game.setNumOfPlayers(number);
    $scope.numOfPlayers = number;
    //$cookieStore.put('guests', number);
  }

$scope.getNumOfPlayers = function() {
    this.num = Game.getNumOfPlayers();
    console.log(this.num);
    console.log("hehehe"+new Array(this.num).length);
    console.log(new Array(this.num));
    return new Array(this.num); 
}

/*$scope.getNumber = function() {
	console.log(this.num);
    return new Array(this.num);   
}*/

});