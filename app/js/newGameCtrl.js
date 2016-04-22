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
}

$scope.getNumOfPlayers = function() {
  this.num = Game.getNumOfPlayers();
  Game.whoStarts();
  return new Array(this.num);  
  }



$scope.feedback = {
  text:"",
  word: /^\s*\w*\s*$/
};


// $scope.stoppedTyping = function(){
// 	console.log("inne i stoppedTyping");
//     if(this.value.length > 0) {
//     	console.log("om värdet av inputet är större än 0, disabled = false");
//         document.getElementById('buttonInWell').disabled = false; 
//     } else { 
//     	console.log("om värdet av inputet är större än 0, disabled = true");
//         document.getElementById('buttonInWell').disabled = true;
//     }
// }


$scope.setPlayerList =function(){
	// if myText is empty{
 //        alert "Put some text in there!"
 //        return
 //    }
 //    else{
 //        do button functionality
 //    }
	var numPlayers = $cookieStore.get('numPlayers');
	for(var i = 0; i < numPlayers;++i ){
		console.log("nu sätter vi spelarna");
		var nickname = $("[name='nickName-"+ i +"']").val();
		var avatar = $("[name='avatar-"+ i +"']").val();
		Game.newPlayer(nickname,avatar);
		console.log(nickname, avatar);
	}
}


$scope.deleteAddRow = function($event){
	var id = $event.currentTarget.id;
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


// $scope.delete = function($event) {
// 	var id = $event.currentTarget.id;
// 	var values = id.split(",");
// 	var nickname = values[0];
// 	var avatar = values[1];
// 	$("[name='"+ nickname +"']").remove();
// 	$("[name='"+ avatar +"']").remove();
// 	$("[id='"+ id +"']").remove();
// 	$("[id='"+ nickname +"']").remove();
// 	var numOfPlayer = $cookieStore.get('numPlayers');
// 	numOfPlayer--;
// 	$cookieStore.put('numPlayers', numOfPlayer);
// };

$scope.init();

});