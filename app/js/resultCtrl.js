
dinnerPlannerApp.controller('ResultCtrl', function ($scope,Game,$routeParams,$cookieStore,Auth,$http,$timeout) {

  $scope.result=[];
  $scope.showToplist = true;
  $scope.mplayer = $cookieStore.get('multiplayer');
  

  init = function(){
    console.log("INIT result");
    Game.getResult();
    $scope.result = Game.spelargrupp;
    console.log($scope.result);

    if(!Auth.multiplayer && !$scope.mplayer){
      console.log("if");
      insertData();
    }else{
      console.log("else");
      $scope.showToplist = false;
    }
    var cloudArr = ["//giphy.com/embed/weKozimGUbPMI", "//giphy.com/embed/S0gd87kFXjUje", "//giphy.com/embed/m0pnkCXTtEiGs"];
    var randomNumber = Math.floor(Math.random()*cloudArr.length);

    if ($("#iframeR").attr('src') === ""){
      console.log("iframe scr är tom");

      $("#iframeR").attr("src", cloudArr[randomNumber]);           
    }else{
      $("#iframeR").attr("src", cloudArr[randomNumber]);
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
    $cookieStore.remove('backgroundImg');
    $cookieStore.remove('multiplayer');
    Game.resetGame();
    $cookieStore.remove('firstQAsked');
    $scope.result=[];
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
            
            $timeout(function() {
                $scope.$apply(function(){
                $scope.APIrespo = true;
                $scope.toplist = response.data.rss.channels[0].items;
              });
            });
          

              });
            })
            .error(function (data, status, header, config) {
              
            });
        };

    insertData = function(){
      SendData(Game.spelargrupp[0][0], Game.spelargrupp[0][2]);
    }

  init();

    
});