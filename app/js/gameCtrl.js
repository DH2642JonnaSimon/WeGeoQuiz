
// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('GameCtrl', function ($scope, $routeParams, $location, Game, $timeout, $interval, $cookieStore, Auth) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.answer = "";
  $scope.questionquestionFromModel = "";
  $scope.show = true;
  $scope.amountOfQuestions = Game.amountOfQuestions * Game.numOfPlayers;
  $scope.questionNumber = 0;
  $scope.playerToStart = "";
  $scope.timeOut = false;



  $scope.init = function(){
    $scope.nextPlayer = Game.currentPlayer;
    var cloudArr = ["//giphy.com/embed/xwy9AbBlXlIFW", "//giphy.com/embed/c5Rlke9hRLoDS", "//giphy.com/embed/pPtbW1ziRZsBO"];
    var randomNumber = Math.floor(Math.random()*cloudArr.length);
    var firstAsked = $cookieStore.get('firstQAsked');
    console.log(typeof(firstAsked));
    if(firstAsked == undefined){
      console.log("Här ska jag vara första hången sidan laddas");
        $timeout(function() {
          $scope.$apply(function(){
            $scope.firstReload = true;
          }); 
        });
    }else if(firstAsked === "yes"){
        $timeout(function() {
        $scope.$apply(function(){
            $scope.Reload = true;
          }); 
        }); 
    }

    if ($("#iframeQ").attr('src') === ""){
      console.log("iframe scr är tom");
      $("#iframeQ").attr("src", cloudArr[randomNumber]);          
    }else{
      $("#iframeQ").attr("src", cloudArr[randomNumber]);
    }
  }

  $scope.firstReloadB = function(){
    $timeout(function() {
      $scope.$apply(function(){
        $scope.firstReload = false;
      }); 
    });    
    
    Game.initL(callbackQuestionsLoaded, Game);
  }

  $scope.ReloadB = function(){
    $timeout(function() {
      $scope.$apply(function(){
        $scope.Reload = false;
      }); 
    });   
    Game.initL(callbackQuestionsLoaded, Game);
  }

  $scope.player = function(){
    $scope.playerToStart = Game.currentPlayer;
  }

  $scope.onShow = function() { 
      $timeout(function() {
        $scope.questionFromModel ="";
        $scope.options = [];
        if($scope.finalAnswer == true){
          $('#answer').css("background-color", "Green");
          $('#answer').css("color", "Black");
          $('#answer').html("Correct"); 
        } else{
        	$('#answer').html("Wrong"); 
        	$('#answer').css("background-color", "Red");
        	$('#answer').css("color", "Black");
          $('[name="answer' + $scope.finalAnswer + '"]').css("background-color", "Green");
        } 
      },1000);
   }

   function showMe() {
      $scope.questionFromModel = Game.question.question;

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
          Game.whoStarts();
          $scope.playerToStart = Game.currentPlayer;
          $scope.switchQuestion = true;
          $("#coveringDiv").css("height", $("#questionDiv").height());
          $scope.nextPlayer = Game.getCurrentPlayer();
          $scope.playerToStart = "";      
        },800);
     }

  $scope.counter = 45;

  

$scope.onTimeout= function(){  
      $scope.timer = $interval(function(){
        var time = Game.reloadedTime;

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
      $timeout(function() {
        $scope.$apply(function(){
          $scope.timeOut = true;
          console.log($scope.timeOut);
        }); 
      });
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

    $timeout(function() {
      $scope.$apply(function(){
        $scope.timeOut = false;
        console.log($scope.timeOut);
      }); 
    });
   
  }

 $scope.images = [{'thumb': '1.png'}]
  $scope.draggedAnswer = [];
  angular.forEach($scope.images, function(val, key) {
    $scope.draggedAnswer.push({});
  });

  $scope.startCallback = function(event, ui, title) {
    //Började dra ett dragbart objekt
    $scope.draggedTitle = title.title;
    ui.helper.css("border-color", "Red");
  };

  $scope.stopCallback = function(event, ui) {
    //Objektet blev droppat över ett icke droppbart ställe
    ui.helper.css("border-color", "#7c5b2b");
  };

  $scope.dragCallback = function(event, ui) {
  };

  $scope.dropCallback = function(event, ui) {
    //dragbart objekt blev droppat till en ny droppbar zon/element
    ui.draggable.css("border-color", "Yellow");
    $scope.answered($scope.draggedTitle);
  };

  $scope.overCallback = function(event, ui) {
    //Dragbart objekt är över ett droppbart ställe
    ui.draggable.css("border-color", "Green");
  };

  $scope.outCallback = function(event, ui) {
    //Dragbart objekt är inte över ett droppbart ställe    
    ui.draggable.css("border-color", "Red");
    
  };


});