dinnerPlannerApp.controller('NewGameCtrl', function ($scope,$routeParams,Game,$cookieStore) {




$scope.init = function() {
	if($cookieStore.get("spelargrupp")){
		// $scope.nickName = $cookieStore.get("spelargrupp");
		$scope.spelargrupp = $cookieStore.get("spelargrupp");
		console.log($scope.spelargrupp);
		for(i in $scope.spelargrupp){
			console.log(i);
			$scope.nickName = i[0];
			$scope.avatar = i[1];
			console.log($scope.nickName, $scope.avatar);
		}
	}
}

$scope.getNumOfPlayers = function() {
  this.num = Game.getNumOfPlayers();
  Game.whoStarts();
  return new Array(this.num);  
  }

$scope.feedback = {
  text:"",
  word: /^\s*\w*\s*$/
};

$scope.submit = function(nickName,avatar) {
	console.log(nickName);
    Game.newPlayer(nickName,avatar);
  };

$scope.init();

});