// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('GameCtrl', function ($scope, $cookieStore, $routeParams, Game) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case


/*	Dinner.Dish.get({id:$routeParams.dishId},function(data){
     	$scope.dish=data;
     	$scope.ingredients=data.Ingredients;
     	var pris = 0.00;
     	for (x in data.Ingredients){
     		pris += data.Ingredients[x].Quantity;
     	}
      Dinner.setPendingDish(data);
      $scope.pendingDishP = Dinner.getDishPrice(data);
      $scope.category = data.Category;
      //alert(Dinner.getPendingDish());
     	$scope.totalPrice = pris;
   			},function(data){
     	$scope.status = "There was an error";
   	});*/

  $scope.answer = "";
  $scope.questionquestionFromModel = "";


  $scope.init = function(){
    getQuestion();
  }


  $scope.answered = function(answer){
    if(answer == "a1" || answer == "a2" || answer == "a3"){
      $scope.finalAnswer = answer;
    }else{
      alert("You need to select a valid answer by selecting one of the three options.");
    }
  }

  function getQuestion(){
    $scope.questionFromModel = Game.testFunction();
  }



});