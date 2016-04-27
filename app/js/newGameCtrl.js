dinnerPlannerApp.controller('NewGameCtrl', function ($scope,$routeParams,Game,$cookieStore) {



$scope.init = function() {
	if($cookieStore.get("spelargrupp")){
		// $scope.nickName = $cookieStore.get("spelargrupp");
		$scope.spelargrupp = $cookieStore.get("spelargrupp");
		for(i in $scope.spelargrupp){
			$scope.nickName = i[0];
			$scope.avatar = i[1];
		}
	}

	if ($("#iframeWeather").attr('src') === ""){
		var backgroungImg = $cookieStore.get('backgroungImg');
		console.log("Nu har vi laddat om sidan "+backgroungImg);
		$("#iframeWeather").attr("src", backgroungImg); 
	}else{
		console.log("Vi har inte laddat om sidan");
	}
}

$scope.getNumOfPlayers = function() {
  this.num = Game.getNumOfPlayers();
  Game.whoStarts();
  return new Array(this.num);  
  }


$scope.setPlayerList =function($event){
 	$scope.valueInput = "";
 	$scope.valueSelect = "";
 	$scope.errorList = 0;


 	$(".inputfieldValue").each(function(index, data){
 		$scope.valueInput = $(this).val();
 		if($scope.valueInput == ''){
 			$("[name='errorDiv-" + index + "']").html("<p id='errorTextColor'>*You need a name</p>");
 			$scope.errorList += 1;
 			$event.preventDefault();

 			console.log($scope.errorList);

 		}else{
 			$("[name='errorDiv-" + index + "']").html("");
 			console.log($scope.errorList);
 		}
 	});

 	$(".avatar").each(function(index, data){
 		$scope.valueSelect = $(this).val();
 	});

 	/*$(".selectValue").each(function(index, data){
 		$scope.valueSelect = $(this).val();
 		console.log("Value of undefiened icon" + $scope.value);
 		if($scope.valueSelect === '? undefined:undefined ?'){
 			$("[name='errorDivSelect-" + index + "']").html("<p id='errorTextColor'>*Select a icon, bro!</p>");
 			$scope.errorList += 1;
 			console.log($scope.errorList);
 			$event.preventDefault();
 		}else{
 			$("[name='errorDivSelect-" + index + "']").html("");
 			console.log($scope.errorList);
 		}
 	});*/
 	var avatars = [];
 	$(":radio:checked").each(function(index, data){
 		avatars.push($(this).attr("id"));
 	});
 	//alert($("input[name=options]:checked").attr('id'));

 	
 	if ($scope.errorList === 0){
 		console.log("");
 		var numPlayers = $cookieStore.get('numPlayers');
 		for(var i = 0; i < numPlayers;++i ){
			console.log("nu sätter vi spelarna");
			var nickname = $("[name='nickName-"+ i +"']").val();
			var avatar = avatars[i];
			console.log(avatars[i]);

			console.log(nickname, avatar);
			Game.newPlayer(nickname,avatar);
		}
 	}
}


$scope.deleteAddRow = function($event){
	var id = $event.currentTarget.id;
	this.num = Game.getNumOfPlayers();
	if(this.num <= 1 && id == "del"){
		console.log($(".errorDiv").html());
		if($(".errorDiv").html() == undefined){
			$("#newGameScroll").append("<h1 class='errorDiv'>The minimum amount of players is 1</h1>");
		}
		$(".errorDiv").fadeOut(800, function() { $(this).remove(); });
		return;
	}
	console.log(id);
	if(id === "del"){
		this.num = Game.getNumOfPlayers();
		var num = this.num-=1;
		Game.setNumOfPlayers(num);
		return new Array(num); 
	}else if(id === "add"){
		this.num = Game.getNumOfPlayers();
		var num = this.num+=1;
		Game.setNumOfPlayers(num);
		return new Array(num); 
	}
}

$scope.removeCookies = function(){
	$cookieStore.remove('multiplayer');
}

$scope.init();

});