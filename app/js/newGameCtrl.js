dinnerPlannerApp.controller('NewGameCtrl', function ($scope,$cookieStore,$routeParams,Game) {


$scope.getNumOfPlayers = function() {
  this.num = Game.getNumOfPlayers();
  return new Array(this.num);  
  }

$scope.feedback = {
  text:"",
  word: /^\s*\w*\s*$/
};

$scope.submit = function(nickName,avatar) {
    Game.newPlayer(nickName,avatar);
  };

});