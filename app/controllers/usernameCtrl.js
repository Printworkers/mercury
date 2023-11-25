module.exports = function(myApp) {
	// custom controllers
	myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html

		$scope.username =	'test';
	}]);
};