module.exports = function(myApp) {
	myApp.controller('totalActiveAgents', ['$scope', '$window', '$http', function($scope, $window, $http, apiUrl) { // used in header.html
		$http.get(apiUrl + 'agent', {headers: {'x-access-token': localStorage.getItem('semper-admin-token') }}).then(function (response) {
			$scope.today = response.data.data.length
		})
	}]);
}