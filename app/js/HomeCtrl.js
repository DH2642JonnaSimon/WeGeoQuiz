
dinnerPlannerApp.controller('HomeCtrl', function ($scope, $cookieStore, $routeParams, Game, $http) {
console.log("inne i homectrl")

$scope.numOfPlayers = 1;

$scope.setNumOfPlayers = function(number){
    Game.setNumOfPlayers(number);
    $scope.numOfPlayers = number;
    //$cookieStore.put('guests', number);
  }

$scope.getNumOfPlayers = function() {
    this.num = Game.getNumOfPlayers();
    return new Array(this.num); 
}

//postrequest för att lägga in i databasen
SendData = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                nickname: "postman",
                score: "40"
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('http://simonfra.se/WeGeoQuiz/insert.php', data, config)
            .success(function (data, status, headers, config) {
               alert(data);
            })
            .error(function (data, status, header, config) {
              alert("fan");
            });
        };
        SendData();
//hämta ut topplistan
$http.get("http://simonfra.se/WeGeoQuiz/topplist.php")
    .then(function (response) {$scope.names = response.data.records; console.log(response.data);});




});