// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,$cookieStore,Dinner, $routeParams) {


  $scope.setNumberOfGuest = function(number){
  	console.log("Set number of guests - controller");
    Dinner.setNumberOfGuests(number);
    $scope.numberOfGuests = number;
    $cookieStore.put('guests', number);
  }

  $scope.getNumberOfGuests = function() {
      return Dinner.getNumberOfGuests();
  }


  $scope.getMenu = function(){
    if($cookieStore.get("guests")){
      Dinner.setNumberOfGuests($cookieStore.get("guests"));
      $scope.numberOfGuests = $cookieStore.get("guests");
    }else{
      $scope.numberOfGuests = Dinner.getNumberOfGuests();
    }
    $scope.getNumberOfGuests();

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

  $scope.removeDish = function($event){
    Dinner.removeDishFromMenu(event.target.id);
    var menu = Dinner.menu;
    var menu = [];
    for(x in Dinner.menu){
      menu.push(Dinner.menu[x].RecipeID);
    }
    $scope.totalPrice = Dinner.getTotalMenuPrice();
    $cookieStore.put('menu', menu);    
  }




  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});