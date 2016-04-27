
dinnerPlannerApp.factory('API',function ($resource, $http, $cookieStore) {


// this.weather = $resource("http://api.openweathermap.org/data/2.5/weather",{callback:"test",q:"Stockholm",appid:"ec6ab1cca646a53d843540957780ac3e"});
// console.log(this.weather);
//this.weather = $resource("http://api.openweathermap.org/data/2.5/weather",{callback:"test",appid:"ec6ab1cca646a53d843540957780ac3e"});
// callbacks in apgee: api.openweathermap.org/data/2.5/weather?callback=test&q=Stockholm&appid=ec6ab1cca646a53d843540957780ac3e
//all questions

/////////////////////////// /////////////////////////////
this.curWeather ="";

this.initMap = function(API, ctrl) {

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            this.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log(this.pos);
            var pos = this.pos;
            API.checkWeather(pos, ctrl);
        });
    }else{
    	console.log("something went wrong!");
    }
}


var API_PATH = 'http://api.openweathermap.org/data/2.5/weather?appid=ec6ab1cca646a53d843540957780ac3e';

var Weather = $resource(API_PATH);

this.checkWeather = function(pos, ctrl) {

	var lat = pos.lat;
	var lng = pos.lng;

	var coordinates = {
        lat: pos.lat,
        lon: pos.lng
    };

	Weather.get(coordinates, function(successResult) {
    this.weather = successResult.weather;
    var i = 0;
    for (i in this.weather){
        this.curWeather = this.weather[i].id;
        ctrl.callback(this.curWeather); 
    }
        }, function(errorResult) {
            console.log('Error: ' + errorResult);
        });

} 





/////////////////////////// FLYTTA TILL NY MODELL, SLUT /////////////////////////////


return this;

});