
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game, $http, Auth, API, $timeout, $window) {

$scope.numOfPlayers = 1;

$cookieStore.remove("multiplayer");

Auth.multiplayer = false;
Auth.addObservable(this);

$window.fbAsyncInit();

//set's number of players in multiplayer mode, it was a design choice to put this function on this routing location
//if cookie exists it sets the number of players to the valune int he cookie.
if($cookieStore.get("numPlayers")){
    $scope.num= $cookieStore.get("numPlayers");
}else{
    console.log("sätter värdet på num i home till 2");
    $scope.num = 2;
    $cookieStore.put("numPlayers", $scope.num);
}

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

$scope.callback = function(weather, ctrl){
    $scope.weather = weather;
    console.log("CURRENT WEATHER IN CONTROLER HUEHUE: " + $scope.weather);
    $scope.randomNumber=0;
    if($scope.weather >= 801 && $scope.weather <=804 || $scope.weather >= 951 && $scope.weather <=954){
        var cloudArr = ["//giphy.com/embed/TC8Cap201LtsI", "//giphy.com/embed/SnI9JZGHU9vb2", "//giphy.com/embed/Xmq44SuwVpr1e"];
        if ($("#iframeWeather").attr('src') === ""){
            console.log("MOLN1");
            $scope.randomNumber = Math.floor(Math.random()*cloudArr.length);
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);          
        }else{
            var cloudArr = ["//giphy.com/embed/TC8Cap201LtsI", "//giphy.com/embed/SnI9JZGHU9vb2", "//giphy.com/embed/Xmq44SuwVpr1e"];
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);
        }
    }else if($scope.weather >= 800){
        console.log("KLART, molnfritt");
        var cloudArr = ["//giphy.com/embed/NU9hqIw9vN0fm", "//giphy.com/embed/SnI9JZGHU9vb2", "//giphy.com/embed/CkShVRmZnvHqM"];
        if ($("#iframeWeather").attr('src') === ""){
            $scope.randomNumber = Math.floor(Math.random()*cloudArr.length);
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);           
        }else{
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);
        }
    }else if($scope.weather >= 500 && $scope.weather <=531 || $scope.weather >= 300 && $scope.weather <= 321){
        console.log("rain!!");
        var cloudArr = ["//giphy.com/embed/qczA5gN00zI8U", "//giphy.com/embed/QCL9EzG4pHiFi", "//giphy.com/embed/2xdzNrPE50WLC"];
        if ($("#iframeWeather").attr('src') === ""){
            $scope.randomNumber = Math.floor(Math.random()*cloudArr.length);
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);           
        }else{
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);
        }
    }else if($scope.weather >= 200 && $scope.weather <=232){
        console.log("thunderStorm");
        var cloudArr = ["//giphy.com/embed/9vb54xSyXXo8o", "//giphy.com/embed/Ik9yPi8vsYDXq", "//giphy.com/embed/9vb54xSyXXo8o", "//giphy.com/embed/d7PElE9GaaodG"];
        if ($("#iframeWeather").attr('src') === ""){
            $scope.randomNumber = Math.floor(Math.random()*cloudArr.length);
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);           
        }else{
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);
        }
    }else if($scope.weather >= 600 && $scope.weather <=622 || $scope.weather === 903){
        console.log("snow");
        var cloudArr = ["//giphy.com/embed/THKr9ClAOJAFa", "//giphy.com/embed/8XdaAvz3eN4Qw", "//giphy.com/embed/mwiOcCHkSwLrq"];
        if ($("#iframeWeather").attr('src') === ""){
            $scope.randomNumber = Math.floor(Math.random()*cloudArr.length);
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);           
        }else{
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);
        }
    }else if($scope.weather >= 701 && $scope.weather <=781){
        console.log("mist, smoke");
        var cloudArr = ["//giphy.com/embed/ofrQ8FYfTD8gE", "//giphy.com/embed/KU57UJZIYdgha", "//giphy.com/embed/3oGRFx7dy5pEywA9Ec"];
        if ($("#iframeWeather").attr('src') === ""){
            $scope.randomNumber = Math.floor(Math.random()*cloudArr.length);
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);           
        }else{
            $("#iframeWeather").attr("src",cloudArr[$scope.randomNumber]);
        }
    }else if($scope.weather === 905 || $scope.weather >= 955 && $scope.weather <=961){
        console.log("windy");
        if ($("#iframeWeather").attr('src') === ""){
            $("#iframeWeather").attr("src", "//giphy.com/embed/5kx1QxAJwQuyc");           
        }else{
            $("#iframeWeather").attr("src", "//giphy.com/embed/5kx1QxAJwQuyc");
        }
    }else if($scope.weather === 904){
        console.log("HOT");
        if ($("#iframeWeather").attr('src') === ""){
            $("#iframeWeather").attr("src", "//giphy.com/embed/qWzB3ja63xk1a");           
        }else{
            $("#iframeWeather").attr("src", "//giphy.com/embed/qWzB3ja63xk1a");
        }
    }else{
        $("#iframeWeather").attr("src", "//giphy.com/embed/HRwfngi7yYpfq");
    }

    var weatherHttp = cloudArr[$scope.randomNumber];
    console.log(weatherHttp);

    this.APIrespoFunc(weatherHttp);

}

$scope.APIrespoFunc = function(weatherHttp){
    console.log("kollar scope var");
    $cookieStore.put('backgroungImg', weatherHttp);
    $timeout(function() {
        $scope.$apply(function(){
            $scope.APIrespo = true;
            console.log($scope.APIrespo);
        });
    });

}



$scope.activateAPI = function(){   
	API.initMap(API, this);
// Här ska jag få put väderID :P

}

//used as an observerfunction to change the logged in status when logging in/out from facebook api, 1 view is dependent on this as of yet
this.setLoggedIn = function(loggedIn){
    $scope.$apply(function(){
            $scope.loggedIn = loggedIn; 
    });
}

this.setUser = function(user){
    
    $timeout(function() {
        $scope.$apply(function(){
          $scope.user = user;
          console.log($scope.user);
          Game.newPlayer(user.name, "1");
          Game.whoStarts();
        }); 
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