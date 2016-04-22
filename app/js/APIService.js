
dinnerPlannerApp.factory('API',function ($resource, $http, $cookieStore) {


// this.weather = $resource("http://api.openweathermap.org/data/2.5/weather",{callback:"test",q:"Stockholm",appid:"ec6ab1cca646a53d843540957780ac3e"});
// console.log(this.weather);
//this.weather = $resource("http://api.openweathermap.org/data/2.5/weather",{callback:"test",appid:"ec6ab1cca646a53d843540957780ac3e"});
// callbacks in apgee: api.openweathermap.org/data/2.5/weather?callback=test&q=Stockholm&appid=ec6ab1cca646a53d843540957780ac3e
//all questions

/////////////////////////// FLYTTA TILL NY MODELL /////////////////////////////


this.initMap = function() {

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            this.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log(this.pos);
            var pos = this.pos;
            checkWeather(pos);

        });
    }else{
    	console.log("something went wrong!");
    }
}


var API_PATH = 'http://api.openweathermap.org/data/2.5/weather?appid=ec6ab1cca646a53d843540957780ac3e';

var Weather = $resource(API_PATH);

function checkWeather(pos) {

	var lat = pos.lat;
	var lng = pos.lng;

	var coordinates = {
        lat: pos.lat,
        lon: pos.lng
    };

	this.curWeather = Weather.get(coordinates, function(successResult) {
    this.weather = successResult;
    console.log(this.weather);
        }, function(errorResult) {
            console.log('Error: ' + errorResult);
        });
	var weatherInfo = this.curWeather;
	var weather = weatherInfo.weather 
	// console.log(weather);
	// for (i in weather){
	// 	console.log(i);
	// }
} 


/////////////////////////// FLYTTA TILL NY MODELL, SLUT /////////////////////////////


return this;

});