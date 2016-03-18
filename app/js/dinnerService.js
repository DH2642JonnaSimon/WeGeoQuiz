// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {

/*0OV23011kU7B3VVVgxTTTIfdNXeTI3us
  66J8l00npnHHZcCNLRhxkfW1OHxbojy4
  XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN
  3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4
  8vtk7KykflO5IzB96kb0mpot0sU40096
  1hg3g4Dkwr6pSt22n00EfS01rz568IR6
  r02x0R09O76JMCMc4nuM0PJXawUHpBUL
  H9n1zb6es492fj87OxDtZM9s5sb29rW3*/

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'r02x0R09O76JMCMc4nuM0PJXawUHpBUL'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'r02x0R09O76JMCMc4nuM0PJXawUHpBUL'});
  
  this.numberOfGuests = 1.00;
  this.menu = {"Appetizers": "", "Desserts": "", "Main Dish": ""};
  this.pendingDish = "";
  this.pg = 1;
  this.rpp = 8;

  //För att kunna uppdatera viewn när nåt i modellen ändras behövs observer patterns.
  //Först addera observer-metoder till modellen:
  //this.addObserver = function(observer) {} - Array where to add new observers
  //var notifyObservers = function(obj) {} - that will call the update method on all the observers in the array
  //Metoderna nedan skall tillkalla notifyObserver-motoden när något ändras.
  //notifyObserver-metoden kan innehålla inget argument eller vilket objekt som helst!


  this.setNumberOfGuests = function(num) {
    this.numberOfGuests = num;
  }

  this.setPendingDish = function(dish){
    if(dish == ""){
      this.pendingDish = "";
      return;
    }
    this.pendingDish = dish;
  }

  this.getPendingDish = function(){
    return this.pendingDish;
  }

  // should return 
  this.getNumberOfGuests = function() {
    return this.numberOfGuests;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    return this.menu[type];
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    return this.menu;
  }
  

  //Returns all ingredients for all the dishes on the menu. //OBS Lägg till .name om endast namnet på ingrediensen sökes
  this.getAllIngredients = function() {
    var ingredients = [];
    for(var dish in menu){
      for(ingredient in menu[dish].ingredients){
        ingredients.push(menu[dish].ingredients[ingredient]);
      }
    }
    return ingredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var totalPrice = 0.00;
    var prices = [];
    var amountOfIng = 0.00;
    if (this.pendingDish == "" || this.pendingDish === "" || this.pendingDish == null || this.pendingDish == "undefined"){
      for(d in this.menu){
        amountOfIng = 0.00;
          for(a in this.menu[d].Ingredients) {
            amountOfIng += this.menu[d].Ingredients[a].Quantity;
          }
            var dishPrice = amountOfIng;
            prices.push(dishPrice);
        }

      for (var i = 0; i < prices.length; i++) {
          totalPrice += prices[i] << 0;
      }
    }else{
      for(a in this.pendingDish.Ingredients) {
          amountOfIng += this.pendingDish.Ingredients[a].Quantity;
        }
        pendingPrice = amountOfIng;
        var status = false;

      for(d in this.menu){
        amountOfIng = 0.00;
          if(this.pendingDish.Category == this.menu[d].Category){
            status = true;
            for(a in this.pendingDish.Ingredients) {
              amountOfIng += this.pendingDish.Ingredients[a].Quantity;
            }
          }else{
            for(a in this.menu[d].Ingredients) {
              amountOfIng += this.menu[d].Ingredients[a].Quantity;
            }

          }
            var dishPrice = amountOfIng;
            prices.push(dishPrice);
        }

      for (var i = 0; i < prices.length; i++) {
          totalPrice += prices[i] << 0;
      }
      if(status != true){
          totalPrice += pendingPrice; 
        }
    }
    return totalPrice;

  }
  
  this.getDishPrice = function(dish) {
      var price = 0.00;

      for(ingredient in dish.Ingredients){
      price += dish.Ingredients[ingredient].Quantity;
    }
    return price;
  }

    this.getDishPrices = function() {
      console.log(this.menu + "Hur der menyn ut?");
      var prices = [];
      for(dish in this.menu){
        var price = 0.00;
        for(ingredient in this.menu[dish].Ingredients){
          price += this.menu[dish].Ingredients[ingredient].Quantity;
        }
        prices.push(price);
        console.log("SUSPENSOUR");
      }
    return prices;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dish) {
    var addedDish = dish;
    if(addedDish){
      this.menu[addedDish.Category] = addedDish;  
    }
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(var dish in this.menu){
      if(this.menu[dish].RecipeID == id){
        this.menu[dish] = "";
      }
    }
  }

  this.resetPage = function(){
    this.pg = 1;
    this.rpp = 8;
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned

  this.nextPage = function(){
    this.pg = this.pg + 1;
  }

  return this;

});