dinnerPlannerApp.controller('NewGameCtrl', function ($scope,$cookieStore,$routeParams,Game) {


$scope.getNumOfPlayers = function() {
  this.num = Game.getNumOfPlayers();
  return new Array(this.num);  
  }

});