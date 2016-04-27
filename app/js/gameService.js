
dinnerPlannerApp.factory('Game',function ($resource, $http, $cookieStore) {

this.questions = '';
this.question = '';
this.askedQuestions=[];
this.spelargrupp = [];
this.rnStart = 1337;
this.amountOfQuestions = 2;
this.counter = 0;
this.timePoints = 0;
this.curPlayer = "";
this.reloadedTime = 0;

//Denna funktion tar in tid och beräknar poäng utifrån tid om rätt svar.
this.timePoint = function(time,player){
	var timePoints = 0;
	if(time<= 45 && time>=35){
		timePoints = 3;
	}else if(time<= 34 && time>=25){
		timePoints = 2;
	}else if(time<= 24){
		timePoints = 1;
	}
	this.curPlayer = this.spelargrupp[this.rnStart];
	
	this.curPlayer[2] += timePoints; 
	$cookieStore.put('spelargrupp', this.spelargrupp);
}


///Funktion som slumpar fam vem som börjar och
// håller orning på vems tur det är.
this.whoStarts = function(){
	if (this.rnStart == 1337){
		var rnStart = Math.floor((Math.random() * this.spelargrupp.length));
		this.rnStart = rnStart;
	}else if (this.rnStart < this.spelargrupp.length - 1){
		this.rnStart = this.rnStart + 1;
	}else{
		this.rnStart = 0;
	}	
	$cookieStore.put('whoToPlay', this.rnStart);
	this.currentPlayer = this.spelargrupp[this.rnStart];
	return this.spelargrupp[this.rnStart];
}


//returnerar current player
this.getCurrentPlayer = function(){
	return this.currentPlayer;
}

///Skapa spelare i spelgrupp - funktion (emoj/avatar och nickname ska in), samt lägg till denna spelare i spelargruppen
this.newPlayer = function(nickname, emoj){
	this.playerlist = [];
	var nickname = nickname;
	var emoj = emoj;
	var points = 0;
	if(this.spelargrupp.length === this.numOfPlayers - 1){
		this.playerlist.push(nickname, emoj, points);
		this.spelargrupp.push(this.playerlist);
		$cookieStore.put('spelargrupp', this.spelargrupp);
		return this.spelargrupp
	}else{
		this.playerlist.push(nickname, emoj, points);
		this.spelargrupp.push(this.playerlist);
		return this.spelargrupp
	}
}


//sätter antal frågor som ska köras innan spelet är över
this.setGameLength = function(num){
	this.amountOfQuestions = num;
}

///Funktion som hämtar fråga
this.numOfPlayers = 1;

this.setNumOfPlayers = function(num){
	this.numOfPlayers = num
	$cookieStore.put('numPlayers', num);
}

this.getNumOfPlayers = function() {
	if($cookieStore.get("numPlayers")){
      this.numOfPlayers = $cookieStore.get("numPlayers");
      return this.numOfPlayers;
    }else{
      return this.numOfPlayers;
    }
}

this.getNewQuestion = function(){
	console.log("get new Q");
	var rn = Math.floor((Math.random() * questions.length) + 1);
	question = questions[rn];
}
///Funktion som hämtar ny slumpvald fråga, kallar på this.askedQuestions för att kontrollera om frågan redan är ställd. Sparar cookies.
this.generateNewQuestion = function(){
	var rn = Math.floor((Math.random() * this.questions.length) + 1);
	this.question = this.questions[rn];
	var checkQ = this.question;
	  	for(i in this.askedQuestions){
	  		if(i === checkQ.question){
	  			generateNewQuestion();
	  		}else{
  				this.askedQuestions.push(checkQ.question);
  				this.rnList.push(rn);
  				$cookieStore.put('rnList', this.rnList);
  				$cookieStore.put("askedQuestions", this.askedQuestions);
				return this.question;
	 		}
	  	}
}

///Funktion som kontrollerar att svar är rätt för frågan
this.correctAnswer = function(answer){
	this.counter += 1;
	$cookieStore.put('numOfQ', this.counter);
	if(this.question.answer == answer){
		return true;
	}else{
		return this.question.answer;
	}
}

//Adds to the time-counter (called from gamectrl)
this.addToCounter = function(){
	this.counter += 1;
	$cookieStore.put('numOfQ', this.counter);
}


///Funktion som kollar om spelet är slut. Körs varjegång nån har kört en fråga
this.isGameOver = function(){
	if(this.counter >= this.amountOfQuestions*this.spelargrupp.length){
		return true;
	}else{
		return false;
	}
}

//Kollar om gamesidan reloadas elle rom den körs för första gången och sätter attribut därutefter sedan returnerar en fråga och vem som startar
this.currentQuestion = function(rn){
	this.rnList = $cookieStore.get('rnList');
	if(typeof $cookieStore.get('rnList') === "undefined"){
		this.rnList = [];
		this.rnList.push(rn);
		$cookieStore.put('rnList', this.rnList);
		this.question = this.questions[rn];
		this.counter = $cookieStore.get('numOfQ');
		this.reloadedPage="yes";
		$cookieStore.put('firstQAsked', this.reloadedPage);
		if(typeof $cookieStore.get('numOfQ') === "undefined"){
			this.counter = 0;
			$cookieStore.put('numOfQ', this.counter);
		}
	}else{
		this.rnList = $cookieStore.get('rnList');
		this.spelargrupp = $cookieStore.get('spelargrupp');
		var rnLastElemant = this.rnList[this.rnList.length - 1];

		this.question = this.questions[rnLastElemant];
		this.rnStart = $cookieStore.get('whoToPlay');
		this.spelargrupp = $cookieStore.get('spelargrupp');
		this.currentPlayer = this.spelargrupp[this.rnStart];
		this.reloadedTime = $cookieStore.get('time');
		this.counter = $cookieStore.get('numOfQ');
		return this.question, this.rnStart;
	}
}

///Funktion- sätt antal frågor (valmöjlighet)
/*this.setAmountOfQuestions = function(number){
	this.amountOfQuestions = number;
}*/


//returnerar nuvarande fråga
this.getQuestion = function(){
	return this.question;
}

//Hämtar in fråga från fil och sätter den som currentquesiton, samt kolla så att den inte har frågats innan
this.initL = function(callback, Game){
	$http.get('../resources/triviaQuestions.json').success(function(data, status, headers, config) {
		Game.questions = data;
		var rn = Math.floor((Math.random() * Game.questions.length) + 1);
		var checkQ = Game.questions[rn];
		Game.askedQuestions.push(checkQ.question);
		Game.currentQuestion(rn);
		callback(Game); 
	});
}

//sorts players depending on point/score
this.getResult = function(){
	this.spelargrupp = $cookieStore.get('spelargrupp');
 	this.spelargrupp.sort(function(a, b) {
	    var valueA, valueB;

	    valueA = a[2];
	    valueB = b[2];
	return valueB - valueA;
	});
	$cookieStore.put('spelargrupp', this.spelargrupp);
}

//Resets the game attributes
this.resetGame = function(){
	this.questions = '';
	this.question = '';
	this.askedQuestions=[];
	this.spelargrupp = [];
	this.rnStart = 1337;
	this.amountOfQuestions = 2;
	this.counter = 0;
	this.timePoints = 0;
	this.curPlayer = "";
	this.reloadedTime = 0;
}


return this;

});