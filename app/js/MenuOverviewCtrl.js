// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('MenuOverviewCtrl', function ($scope,$cookieStore,$routeParams,Dinner) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.init = function(){
  	alert($cookieStore.get("guests"));
  	if($cookieStore.get("guests")){
      Dinner.setNumberOfGuests($cookieStore.get("guests"));
      $scope.numberOfGuests = $cookieStore.get("guests");
    }else{
      $scope.numberOfGuests = Dinner.getNumberOfGuests();
    }

  	var menuCookie = $cookieStore.get('menu');
    console.log(menuCookie);
    // Setting a cookie
    
    for(x in menuCookie){
      if(menuCookie[x] != null){
        Dinner.Dish.get({id:menuCookie[x]},function(data){
          $scope.dish=data;
          Dinner.addDishToMenu(data);
          $scope.menu = Dinner.menu;
          console.log(Dinner.menu);
          var pris = 0.00;
          $scope.prices = [];
          $scope.prices = Dinner.getDishPrices();
          $scope.totalPrice = Dinner.getTotalMenuPrice();
        },function(data){
            $scope.status = "There was an error";
        });
      }
    }
	}

	$scope.init();

});