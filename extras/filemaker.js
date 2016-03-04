module.exports = function (myApp) {

	myApp.config(function($stateProvider) {
		$stateProvider.state('filemaker', {
			parent: 'main',
			url: '/filemaker',
			controller: function($scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/filemaker.html'
		});
	});

	myApp.config(function($stateProvider) {
		$stateProvider.state('findAndLinkToFM', {
			parent: 'main',
			url: '/findAndLink',
			controller: function($scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/findAndLink.html'
		});
	});

	myApp.config(function($stateProvider) {
		$stateProvider.state('compareWebToFm', {
			parent: 'main',
			url: '/compareWebToFm',
			controller: function($scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/compareWebToFm.html'
		});
	});

}