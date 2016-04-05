// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('GameCtrl', function ($scope, $cookieStore, $routeParams, $location, Game) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.answer = "";
  $scope.questionquestionFromModel = "";

  $scope.init = function(){
    Game.initL(callbackQuestionsLoaded, Game);
  }

  $scope.answered = function(answer){
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

});