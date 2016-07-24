(function() {

var app = angular.module('chatTag', []);


app.controller('ConvoController', ['$scope', function($scope) {
	$scope.username = "user 1";
	$scope.messages = init;
	$scope.test = "this is a test";
	$scope.currentMessage = "";

	$scope.addMessage = function(message) {
		$scope.messages.push( {
			username: $scope.username, 
			message: message,
			date: new Date()
			}
			);
	};
}]);

app.controller('ChatBoxController', ['$scope', function($scope) {
	$scope.message = "";

	$scope.sendMessage = function(message) {
		// update the global instance of a message
		$scope.message = message;

		// show that message as a part of the conversation
		$scope.addMessage(message);
		// send the message to the backend using POST Request

		// clear the message
		$scope.message = "";
		$scope.test = "changed it";
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