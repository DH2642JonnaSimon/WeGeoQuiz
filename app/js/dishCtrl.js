// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $cookieStore, $routeParams,Dinner) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

	Dinner.Dish.get({id:$routeParams.dishId},function(data){
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
   	});

	$scope.getNumberOfGuests = function() {
  		console.log("Nu är jag inne numFunc in DishC");
    	return Dinner.getNumberOfGuests();
  	}

    $scope.addToMenu = function(){
      var pendingDish = Dinner.getPendingDish();
      Dinner.addDishToMenu(pendingDish);
      $scope.pendingDishP = 0.00;
      Dinner.setPendingDish("");
      var menu = Dinner.menu;
      var menu = [];
      for(x in Dinner.menu){
        menu.push(Dinner.menu[x].RecipeID);
      }
      $cookieStore.put('menu', menu);
    }

    $scope.removePendingDish = function(){
      $scope.pendingDishP = 0.00;
      Dinner.setPendingDish("");
    }

});