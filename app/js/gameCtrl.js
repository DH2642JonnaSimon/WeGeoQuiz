<<<<<<< HEAD
=======
// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('GameCtrl', function ($scope, $cookieStore, $routeParams, $location, Game, $timeout) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

>>>>>>> origin/master

dinnerPlannerApp.controller('GameCtrl', function ($scope, $cookieStore, $routeParams, $location, Game) {

  $scope.answer = "";
  $scope.questionquestionFromModel = "";
  $scope.show = true;


  $scope.init = function(){
    Game.initL(callbackQuestionsLoaded, Game);
  }

  $scope.player = function(){
    console.log("inne i play :)");
    $scope.playerToStart = Game.whoStarts();
    return $scope.playerToStart[0];
  }

     $scope.onShow = function() { 
        $scope.show = false;
        $timeout(function() { 
           showMe();
        },700);
     }
     function showMe() {
        $scope.show = true;
     }




  $scope.answered = function(answer){
<<<<<<< HEAD

=======
    $scope.onShow();
>>>>>>> origin/master
    if(answer == "A" || answer == "B" || answer == "C" || answer == "D"){
      //kolla om svaret är korrekt
      var correctAnswer = Game.correctAnswer(answer);
      if(correctAnswer == true){
        $scope.finalAnswer = "Congrats, you answerd correctly.";
      }else{
        $scope.finalAnswer = "Wrong answer!"; 
      }
      //kolla om spelet är slut annars ställ en ny fråga
      if(Game.isGameOver()){
        //game is over, gå till resultatsidan
        $location.path('/result');
      }else{
        //spelet är inte slut, ladda ny fråga och presentera den
        Game.generateNewQuestion();
        $scope.presentNewQuestion();
      }
    }else{
      alert("You need to select a valid answer by selecting one of the three options.");
    }
    
  }

  $scope.presentNewQuestion = function(){
    $scope.questionFromModel = Game.question.question;
    $scope.answerA = Game.question.A;
    $scope.answerB = Game.question.B;
    $scope.answerC = Game.question.C;
    $scope.answerD = Game.question.D;

  }

  function callbackQuestionsLoaded(Game){
    $scope.presentNewQuestion();
  }

  $scope.list1 = {title: 'Drag and Drop with custom confirmation'};
  $scope.list2 = {};
  $scope.onDrop = function(item, ui) {
    //alert("You dropped and answer, check if it is correct, give feedback, check if game is over, give new question or go to result page.");
    console.log(ui.draggable.attr('id'));
    $scope.answered(ui.draggable.attr('id'));
  };

});