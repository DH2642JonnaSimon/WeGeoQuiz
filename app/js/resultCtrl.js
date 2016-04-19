dinnerPlannerApp.controller('ResultCtrl', function ($scope,Game,$routeParams,$cookieStore) {

  $scope.result=[];

  $scope.init = function(){
    Game.getResult();
    $scope.result = Game.spelargrupp;
    console.log($scope.result);
  }

  $scope.removeCookies = function(){
  	$cookieStore.remove('askedQuestions');
  	$cookieStore.remove('numOfQ');
  	$cookieStore.remove('rnList');
  	$cookieStore.remove('spelargrupp');
  	$cookieStore.remove('time');
  	$cookieStore.remove('whoToPlay');
  }
  $scope.init();

});