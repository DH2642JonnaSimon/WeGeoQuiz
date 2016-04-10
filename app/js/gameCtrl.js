
// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('GameCtrl', function ($scope, $cookieStore, $routeParams, $location, Game, $timeout) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.answer = "";
  $scope.questionquestionFromModel = "";
  $scope.show = true;


  $scope.init = function(){
    Game.initL(callbackQuestionsLoaded, Game);
    $scope.player(); 
  }

  $scope.player = function(){
    console.log("inne i play :)");
    $scope.playerToStart = Game.whoStarts();
<<<<<<< HEAD
=======
    console.log($scope.playerToStart);
>>>>>>> DnD-Branch
    return $scope.playerToStart;
  }

  $scope.onShow = function() { 
    $scope.options = [];
      $timeout(function() {
        if($scope.finalAnswer == true){
          $('#answer').css("background-color", "Green");
          $('#answer').css("color", "Black");
          $('#answer').html("Correct"); 
        } else{
        	$('#answer').html("Wrong"); 
        	$('#answer').css("background-color", "Red");
        	$('#answer').css("color", "Black");
        }     
        $scope.onNewquestion();
      },1000);
   }

   function showMe() {
      $scope.options = [
        { 'title': 'A', 'answer': $scope.answerA, 'drag': true },
        { 'title': 'B', 'answer': $scope.answerB, 'drag': true },
        { 'title': 'C', 'answer': $scope.answerC, 'drag': true },
        { 'title': 'D', 'answer': $scope.answerD, 'drag': true }
      ];
      $scope.draggedAnswer = [];
    }

    $scope.onNewquestion = function() { 
        $timeout(function() {
        	$('#answer').html();  
          	$('#answer').css("background-color", "yellow");   
          	showMe();
        },800);
     }




  $scope.answered = function(answer){

    $scope.onShow();
    if(answer == "A" || answer == "B" || answer == "C" || answer == "D"){
      //kolla om svaret är korrekt
      var correctAnswer = Game.correctAnswer(answer);
      if(correctAnswer == true){
        $scope.finalAnswer = true;
      }else{
        $scope.finalAnswer = false; 
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
<<<<<<< HEAD
    $scope.player();
=======
    if(!$scope.options){
      $scope.options = [
          { 'title': 'A', 'answer': $scope.answerA, 'drag': true },
          { 'title': 'B', 'answer': $scope.answerB, 'drag': true },
          { 'title': 'C', 'answer': $scope.answerC, 'drag': true },
          { 'title': 'D', 'answer': $scope.answerD, 'drag': true }
        ];
    }
>>>>>>> DnD-Branch

  }

  function callbackQuestionsLoaded(Game){
    $scope.presentNewQuestion();
  }

  /*$scope.draggedAnswer = {title: 'Drag and Drop with custom confirmation'};
  $scope.options = {};
  $scope.onDrop = function(item, ui) {
    //alert("You dropped and answer, check if it is correct, give feedback, check if game is over, give new question or go to result page.");
    console.log(ui.draggable.attr('id'));
    $scope.answered(ui.draggable.attr('id'));
  };*/
 $scope.images = [{'thumb': '1.png'}]
  $scope.draggedAnswer = [];
  angular.forEach($scope.images, function(val, key) {
    $scope.draggedAnswer.push({});
  });

  $scope.startCallback = function(event, ui, title) {
    //Började dra ett dragbart objekt
    $scope.draggedTitle = title.title;
    ui.helper.css("background-color", "Red");
    console.log(event);
  };

  $scope.stopCallback = function(event, ui) {
    //Objektet blev droppat över ett icke droppbart ställe
    ui.helper.css("background-color", "#5bc0de");
  };

  $scope.dragCallback = function(event, ui) {
    //Objektet blir dragen ;)
    console.log('objektet dras');
  };

  $scope.dropCallback = function(event, ui) {
    //dragbart objekt blev droppat till en ny droppbar zon/element
    ui.draggable.css("background-color", "Yellow");
    $scope.answered($scope.draggedTitle);
  };

  $scope.overCallback = function(event, ui) {
    //Dragbart objekt är över ett droppbart ställe
    ui.draggable.css("background-color", "Green");
  };

  $scope.outCallback = function(event, ui) {
    //Dragbart objekt är inte över ett droppbart ställe    
    ui.draggable.css("background-color", "Red");
    
  };

});