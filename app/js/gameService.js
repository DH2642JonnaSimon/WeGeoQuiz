
dinnerPlannerApp.factory('Game',function ($resource, $http) {


this.QuizSearch = $resource('Adress till APIT motherf');

//all questions
this.questions = '';

//current question being answered
this.question = '';

//Konceptet:
//Vi kör på både en tidsaspekt och en skicka till en annan spelare effekt. 
//Välja vilken tid man svarar på en fråga (poäng beroende på hur kort tid). 
//Kan skicka frågor till andra personer. En viss ordning på frågorna.


//var topplista = [] #NERPRIORITERA
this.spelargrupp = [];
//var svarstid = 0 
this.rnStart = "";
this.amountOfQuestions = 6;
this.counter = 0;

///Addera poäng - funktion (tidaspekten)
this.substractPoints = function(num){
	var tidaspekt = 1;
	if(num < this.spelargrupp.length){
		this.spelargrupp[num].points += num*tidaspekt;
	}
}

///Subtrahera poäng - funktion
this.substractPoints = function(num){
	if(num < this.spelargrupp.length){
		this.spelargrupp[num].points -= num;
	}
}


///Funktion som slumpar fam vem som börjar
this.whoStarts = function(){
	if (!this.rnStart){//om den är lika med en tom sträng gör följande
		console.log("strängen är tom och nu randomas en spelare");
		var rnStart = Math.floor((Math.random() * this.spelargrupp.length));
		this.rnStart = rnStart;
		console.log(this.rnStart);
	}else if(this.rnStart >= this.spelargrupp.length - 1){
		this.rnStart = this.rnStart + 1;
	}else{
		this.rnStart = 0;
	}
	console.log(this.spelargrupp[rnStart]);
	return this.spelargrupp[rnStart];
}

///Skapa spelare i spelgrupp - funktion (emoj/avatar och nickname ska in), samt lägg till denna spelare i spelargruppen
this.newPlayer = function(nickname, emoj){
	this.playerlist = [];
	var nickname = nickname;
	var emoj = emoj;
	var points = 0; 
	this.playerlist.push(nickname, emoj, points);
	this.spelargrupp.push(this.playerlist);
	console.log(this.spelargrupp);
	return this.spelargrupp
}

//sätter antal frågor som ska köras innan spelet är över
this.setGameLength = function(num){
	this.amountOfQuestions = num;
}

///Funktion som hämtar fråga
this.numOfPlayers = 1;

this.setNumOfPlayers = function(num){
	this.numOfPlayers = num
}

this.getNumOfPlayers = function() {
	return this.numOfPlayers;
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
	return this.question;

}

///Funktion som kontrollerar att svar är rätt för frågan
this.correctAnswer = function(answer){
	this.counter += 1;
	if(this.question.answer == answer){
		return true;
	}else{
		return false;
	}
}

///toppliste-funtion # NERPRIORITERAD
    //Fil/Databas

///Funktion som kollar om spelet är slut. Körs varjegång nån har kört en fråga
this.isGameOver = function(){
	console.log("Inne i isGameOver");
	alert("cnter: " + this.counter + " amountof " + this.amountOfQuestions);
	if(this.counter >= this.amountOfQuestions){
		return true;
	}else{
		return false;
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

this.AddPoints = function(num) {
	this.numberOfGuests = num;
}

this.AddPoints = function(num) {
	this.numberOfGuests = num;
}

 this.initL = function(callback, Game){
	$http.get('../resources/triviaQuestions.json').success(function(data, status, headers, config) {
		Game.questions = data;
		var rn = Math.floor((Math.random() * Game.questions.length) + 1);
		Game.question = Game.questions[rn];
		callback(Game);
	});
}

return this;

});