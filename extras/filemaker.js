module.exports = function (myApp) {

	myApp.config(function($stateProvider) {
		$stateProvider.state('filemaker', {
			parent: 'main',
			url: '/filemaker',
			controller: function(user, $scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/filemaker.html'
		});
	});

}