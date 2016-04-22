
dinnerPlannerApp.controller('ResultCtrl', function ($scope,Game,$routeParams,$cookieStore,Auth,$http) {

  $scope.result=[];
  $scope.showToplist = true;


  $scope.init = function(){
    Game.getResult();
    $scope.result = Game.spelargrupp;
    console.log($scope.result);

    if(!Auth.multiplayer){
      console.log("if");
      insertData();
    }else{
      console.log("else");
      $scope.showToplist = false;
    }
  }

  $scope.removeCookies = function(){
  	$cookieStore.remove('askedQuestions');
  	$cookieStore.remove('numOfQ');
  	$cookieStore.remove('rnList');
  	$cookieStore.remove('spelargrupp');
  	$cookieStore.remove('time');
  	$cookieStore.remove('whoToPlay');
  	$cookieStore.remove('numPlayers');
  }
 

  
  
  //postrequest för att lägga in i databasen
  SendData = function (nickname, score) {

            
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                nickname: nickname,
                score: score
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('http://simonfra.se/WeGeoQuiz/insert.php', data, config)
            .success(function (data, status, headers, config) {
               $http.get("http://simonfra.se/WeGeoQuiz/topplist.php")
            .then(function (response) {
            console.log(response.data.rss.channels[0].items);
            $scope.toplist = response.data.rss.channels[0].items;



              });
            })
            .error(function (data, status, header, config) {
              
            });
        };

    insertData = function(){
      for (var i = 0; i < Game.spelargrupp.length; ++i) {
               SendData(Game.spelargrupp[i][0], Game.spelargrupp[i][2]);
      }
    }

$scope.init();

    
});