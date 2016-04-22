<<<<<<< HEAD
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
=======
// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('ResultCtrl', function ($scope, Game, $http, Auth) {
  
  
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
            
      //console.log(response.data.items[0]);

      //console.log(response.data[0].items[0]);



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
>>>>>>> Login_api_branch

    $scope.showToplist = true;

    if(!Auth.multiplayer){
      console.log("if");
      insertData();
    }else{
      console.log("else");
      $scope.showToplist = false;
    }
});