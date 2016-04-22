
// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('GameCtrl', function ($scope, $routeParams, $location, Game, $timeout, $interval, $cookieStore) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.answer = "";
  $scope.questionquestionFromModel = "";
  $scope.show = true;
  $scope.amountOfQuestions = Game.amountOfQuestions;
  $scope.questionNumber = 0;
  $scope.playerToStart = "";
  // Game.weather.get({q:"Stockholm,uk"}, function(data){
  //   console.log(data);
  // });

  $scope.init = function(){
    console.log("inne i init");
    Game.initL(callbackQuestionsLoaded, Game);
  }

  $scope.player = function(){
    $scope.playerToStart = Game.currentPlayer;
  }

  $scope.onShow = function() { 
      console.log("ON RELOAD");
      $timeout(function() {
        console.log("ON RELOAD");
        $scope.questionFromModel ="";
        $scope.options = [];
        if($scope.finalAnswer == true){
          $('#answer').css("background-color", "Green");
          $('#answer').css("color", "Black");
          $('#answer').html("Correct"); 
        } else{
          console.log("ON RELOAD");
        	$('#answer').html("Wrong"); 
        	$('#answer').css("background-color", "Red");
        	$('#answer').css("color", "Black");
          console.log($scope.finalAnswer);
          $('[name="answer' + $scope.finalAnswer + '"]').css("background-color", "Green");
          console.log('[name="answer' + $scope.finalAnswer + '"]');
          console.log($([name="answer' + $scope.finalAnswer + '"]));
        } 
        // $scope.onNewquestion();
      },1000);
   }

   function showMe() {
      $scope.questionFromModel = Game.question.question;

      console.log("ON RELOAD");

      $scope.options = [
        { 'title': 'A', 'answer': $scope.answerA, 'drag': true },
        { 'title': 'B', 'answer': $scope.answerB, 'drag': true },
        { 'title': 'C', 'answer': $scope.answerC, 'drag': true },
        { 'title': 'D', 'answer': $scope.answerD, 'drag': true }
      ];
      $scope.draggedAnswer = [];
    }

    $scope.onNewquestion = function() {
      console.log("ON RELOAD");
        $timeout(function() {
        	$('#answer').html();
          Game.whoStarts();
          $scope.playerToStart = Game.currentPlayer;
          $scope.switchQuestion = true;
          $scope.nextPlayer = Game.getCurrentPlayer();
          $scope.playerToStart = "";      
        },800);
     }

  $scope.counter = 45;

  

$scope.onTimeout= function(){  
      $scope.timer = $interval(function(){
        var time = Game.reloadedTime;
        console.log(time);

        if ($scope.counter==0){
          $scope.stopNoPoints();
        }
        else if(time !== 0){
          $scope.counter = time;
          Game.reloadedTime = 0;
          var time = 0;
        }
        else{
        $scope.counter--;
        var counter = $scope.counter;
        $cookieStore.put('time', counter);
        }
      },1000); 
    }

      
  $scope.stopAddPoints = function(){
    console.log("stop, go to add points");
    var time = $scope.counter;
    // var player = $scope.playerToStart[0];
    Game.timePoint(time);
    $interval.cancel($scope.timer);
    $scope.onNewquestion();
    $scope.counter = 45;
    }

  $scope.stopNoPoints = function(){
    console.log("Nu ska jag inte ha hunnit svara, tid 0 eller så har jag svarat fel");
    $interval.cancel($scope.timer);
    if($scope.counter==0){
      Game.addToCounter();
      $scope.counter = 45;
      $scope.onNewquestion();
    }else{
      $scope.counter = 45;
      $scope.onNewquestion();
    }   
  }

  $scope.answered = function(answer){
    $scope.onShow();
    if(answer == "A" || answer == "B" || answer == "C" || answer == "D"){
      //kolla om svaret är korrekt
      var correctAnswer = Game.correctAnswer(answer);
      if(correctAnswer == true){
        console.log("Nu svarade jag rätt på frågan");
        $scope.finalAnswer = true;
        $scope.stopAddPoints();
      }else{
        console.log("Nu svarade jag fel på frågan");
        $scope.finalAnswer = correctAnswer;
        $scope.stopNoPoints();    
      }
      //kolla om spelet är slut annars ställ en ny fråga
      if(Game.isGameOver()){
        //game is over, gå till resultatsidan
        $location.path('/result');
      }else{
        //spelet är inte slut, ladda ny fråga och presentera den
        $scope.questionNumber += 1;
      }
    }else{
      alert("You need to select a valid answer by selecting one of the three options.");
    }
    
  }

  $scope.presentNewQuestion = function(firstTime){
    if(firstTime){
      console.log("Inne i present new Q, firstTime, funktionen");
      $scope.questionFromModel = Game.question.question;
      $scope.playerToStart = Game.currentPlayer;
      console.log($scope.playerToStart);
    }
    $scope.answerA = Game.question.A;
    $scope.answerB = Game.question.B;
    $scope.answerC = Game.question.C;
    $scope.answerD = Game.question.D;

    if(!$scope.options){
      $scope.options = [
          { 'title': 'A', 'answer': $scope.answerA, 'drag': true },
          { 'title': 'B', 'answer': $scope.answerB, 'drag': true },
          { 'title': 'C', 'answer': $scope.answerC, 'drag': true },
          { 'title': 'D', 'answer': $scope.answerD, 'drag': true }
        ];
    }
    $scope.onTimeout();

  }

  function callbackQuestionsLoaded(Game){
    var firstTime = true;
    $scope.presentNewQuestion(firstTime);
  }

  $scope.nextQuestion = function (){
    $('#answer').css("background-color", "Yellow");
    $scope.player();
    Game.generateNewQuestion();
    $scope.presentNewQuestion(false);
    showMe();
    $scope.playerToStart = Game.currentPlayer; 
    $scope.switchQuestion = false; 
    $scope.nextPlayer = false;     
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
  };

  $scope.stopCallback = function(event, ui) {
    //Objektet blev droppat över ett icke droppbart ställe
    ui.helper.css("background-color", "#5bc0de");
  };

  $scope.dragCallback = function(event, ui) {
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