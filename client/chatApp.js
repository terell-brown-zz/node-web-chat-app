(function() {

var app = angular.module('chatTag', []);

app.controller('SocketController' , ['$scope', function($scope) {
	$scope.status = "Chat was launched";
	$scope.username = "user 1";
	$scope.messages = [];


	$scope.addMessage = function(message) {

		$scope.$apply(function() {
		console.log("adding a new message");
		$scope.messages.push({
			username: $scope.username, 
			message: message,
			date: new Date()
			});
		$scope.status = "addMessage()";
		$scope.message = "";
		$scope.$apply();
		});
	};

	$scope.emitMessage = function (msg) {
		socket.emit('/message', { content: msg });
		$scope.status = "emitMessage()";
	};

	socket = io.connect('http://localhost:3000');

	socket.on('/message', function (data, fn) {
		console.log("submitted: " + data.content);
		$scope.addMessage(data.content);
		$scope.status = "Message recieved";
	});

}]);

app.controller('ConvoController', ['$scope', function($scope) {
	$scope.username = "user 1";	
	$scope.currentMessage = "";
}]);

app.controller('ChatBoxController', ['$scope', function($scope) {
	$scope.message = "";

	$scope.sendMessage = function(msg) {
		$scope.emitMessage(msg);
		$scope.message = "";
	};
}]);

init = [
{
	username: "Terell Brown",
	message: "This is my house",
	date: new Date()
},
{
	username: "Tayzia Brown",
	message: "Thank you",
	date: new Date()
}


];

})();