// Search controller that we use whenever we have a search inputs
// and search results
weGeoQuizApp.controller('ToplistCtrl', function ($scope, Game, $http) {
  
    //hämta ut topplistan
    $http.get("http://simonfra.se/WeGeoQuiz/topplist.php")
    .then(function (response) {
       console.log(response.data.rss.channels[0].items);
      $scope.toplist = response.data.rss.channels[0].items; 
            
      //console.log(response.data.items[0]);

      //console.log(response.data[0].items[0]);



    });    
});