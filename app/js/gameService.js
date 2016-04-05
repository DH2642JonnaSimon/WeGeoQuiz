
dinnerPlannerApp.factory('Game',function ($resource) {


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
//var spelargrupp = []
//var svarstid = 0 
this.amountOfQuestions = 0;
this.counter = 0;

///Addera poäng - funktion (tidaspekten)

///Subtrahera poäng - funktion

///Funktion som slumpar fam vem som börjar

///Skapa spelare i spelgrupp - funktion (emoj/avatar och nickname ska in)

///Funktion som hämtar fråga
this.getNewQuestion = function(){
	var rn = Math.floor((Math.random() * questions.length) + 1);
	question = questions[rn];
}

///Funktion som kontrollerar att svar är rätt för frågan
this.correctAnswer = function(answer){
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

this.testFunction = function(){
	return "Here is a new question from the model";
}

this.AddPoints = function(num) {
	this.numberOfGuests = num;
}

this.AddPoints = function(num) {
	this.numberOfGuests = num;
}

//function som läser in json-filen med frågorna
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../resources/triviaQuestions.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

//init-funktion som anropar och läser in alla frågor.
function init() {
	loadJSON(function(response) {
    	this.questions = JSON.parse(response);
    	//alert(questions[500].question);
    	//alert(questions.length)
	});
}
init();


return this;

});