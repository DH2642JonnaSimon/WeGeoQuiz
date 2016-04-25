
dinnerPlannerApp.factory('Game',function ($resource, $http, $cookieStore) {


this.questions = '';

//current question being answered
this.question = '';

this.askedQuestions=[];


//Konceptet:
//Vi kör på både en tidsaspekt och en skicka till en annan spelare effekt. 
//Välja vilken tid man svarar på en fråga (poäng beroende på hur kort tid). 
//Kan skicka frågor till andra personer. En viss ordning på frågorna.


//var topplista = [] #NERPRIORITERA
this.spelargrupp = [];
//var svarstid = 0 
this.rnStart = 1337;
this.amountOfQuestions = 7;
this.counter = 0;
this.timePoints = 0;
this.curPlayer = "";

//this.rnList = [];
this.reloadedTime = 0;


this.timePoint = function(time,player){
	console.log("inne i timePoints" + time, player);

	var timePoints = 0;
	if(time<= 45 && time>=35){
		timePoints = 3;
	}else if(time<= 34 && time>=25){
		timePoints = 2;
	}else if(time<= 24){
		timePoints = 1;
	}
	console.log(this.spelargrupp, this.rnStart);
	this.curPlayer = this.spelargrupp[this.rnStart];

	console.log(this.curPlayer);
	this.curPlayer[2] += timePoints; 
	$cookieStore.put('spelargrupp', this.spelargrupp);
}


///Funktion som slumpar fam vem som börjar och
// håller orning på vems tur det är.
this.whoStarts = function(){
	if (this.rnStart == 1337){
		console.log("Sätter första spelaren");
		var rnStart = Math.floor((Math.random() * this.spelargrupp.length));
		this.rnStart = rnStart;
		
	}else if (this.rnStart < this.spelargrupp.length - 1){
		this.rnStart = this.rnStart + 1;
	}else{
		this.rnStart = 0;
	}

	$cookieStore.put('whoToPlay', this.rnStart);
	this.currentPlayer = this.spelargrupp[this.rnStart];
	// console.log(this.spelargrupp);
	return this.spelargrupp[this.rnStart];
}


this.getCurrentPlayer = function(){
	return this.currentPlayer;
}

///Skapa spelare i spelgrupp - funktion (emoj/avatar och nickname ska in), samt lägg till denna spelare i spelargruppen
this.newPlayer = function(nickname, emoj){
	console.log("Nu ska en spelare läggas till");
		this.playerlist = [];
		var nickname = nickname;
		var emoj = emoj;
		var points = 0;
	// if(nickname)
		if(this.spelargrupp.length === this.numOfPlayers - 1){
			console.log("Nu läggs sista spelar in och personen borde sparas som cookies");
			this.playerlist.push(nickname, emoj, points);
			this.spelargrupp.push(this.playerlist);
			$cookieStore.put('spelargrupp', this.spelargrupp);
			return this.spelargrupp
		}else{
			console.log("lägger till första spelaren");
			this.playerlist.push(nickname, emoj, points);
			this.spelargrupp.push(this.playerlist);
			console.log("Den tillagda spelaren i spelargruppen "+this.spelargrupp);
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
///Funktion som hämtar ny slumpvald fråga
this.generateNewQuestion = function(){
	console.log("generate new Q");
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
	console.log("kollar om det är rätt svar i servicen och adderar en till this.counter");
	this.counter += 1;
	console.log("HÅLLER RÄKNINGEN PÅ HUR MÅNGA GÅNGER VI KÖRT" + this.counter);
	$cookieStore.put('numOfQ', this.counter);
	if(this.question.answer == answer){
		return true;
	}else{
		return this.question.answer;
	}
}

///toppliste-funtion # NERPRIORITERAD
    //Fil/Databas

this.addToCounter = function(){
	console.log("om tiden gått ut adderar en till this.counter");
	this.counter += 1;
	console.log("HÅLLER RÄKNINGEN PÅ HUR MÅNGA GÅNGER VI KÖRT" + this.counter);
	$cookieStore.put('numOfQ', this.counter);
}


///Funktion som kollar om spelet är slut. Körs varjegång nån har kört en fråga
this.isGameOver = function(){

	//alert("cnter: " + this.counter + " amountof " + this.amountOfQuestions);
	if(this.counter >= this.amountOfQuestions*this.spelargrupp.length){
		return true;
	}else{
		return false;
	}
}

this.currentQuestion = function(rn){
	this.rnList = $cookieStore.get('rnList');
	if(typeof $cookieStore.get('rnList') === "undefined"){
		console.log("Här går jag in första gången en fråga laddas");
		this.rnList = [];
		this.rnList.push(rn);
		$cookieStore.put('rnList', this.rnList);
		this.question = this.questions[rn];
		this.counter = $cookieStore.get('numOfQ');
		if(typeof $cookieStore.get('numOfQ') === "undefined"){
			console.log("Nu är den undefind" + typeof(this.counter));
			this.counter = 0;
			$cookieStore.put('numOfQ', this.counter);
		}
		// this.whoStarts();	
	}else{
		console.log("Här ska jag bara gå in om jag reloadar sidan");

		this.rnList = $cookieStore.get('rnList');
		this.spelargrupp = $cookieStore.get('spelargrupp');

		var rnLastElemant = this.rnList[this.rnList.length - 1];
		this.question = this.questions[rnLastElemant];

		this.rnStart = $cookieStore.get('whoToPlay');
		console.log(this.rnStart);
		this.spelargrupp = $cookieStore.get('spelargrupp');
		console.log(this.spelargrupp);
		this.currentPlayer = this.spelargrupp[this.rnStart];

		this.reloadedTime = $cookieStore.get('time');

		this.counter = $cookieStore.get('numOfQ');
		console.log(this.counter);


		return this.question, this.rnStart;
	}
}

///Funktion- sätt antal frågor (valmöjlighet)
this.setAmountOfQuestions = function(number){
	this.amountOfQuestions = number;
}


//returnerar nuvarande fråga
this.getQuestion = function(){
	return this.question;
}

//Hämtar in fråga från fil
 this.initL = function(callback, Game){
	$http.get('../resources/triviaQuestions.json').success(function(data, status, headers, config) {

		Game.questions = data;
		var rn = Math.floor((Math.random() * Game.questions.length) + 1);
		var checkQ = Game.questions[rn];
		Game.askedQuestions.push(checkQ.question);
		Game.currentQuestion(rn);
		// Game.question = Game.questions[rn];
		callback(Game); 
	});
}


this.getResult = function(){

	this.spelargrupp = $cookieStore.get('spelargrupp');
 	this.spelargrupp.sort(function(a, b) {
    var valueA, valueB;

     valueA = a[2]; // Where 1 is your index, from your example
     valueB = b[2];


     return valueB - valueA;
	});
	$cookieStore.put('spelargrupp', this.spelargrupp);

}


return this;

});