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

	myApp.directive('userFilemakerDetails', function(Restangular) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				// TODO: Add in the API Call to File Mker for this ID.
			},
			templateUrl: 'templates/user-filemaker-details.html'
		};
	});

	myApp.directive('userFilemakerLinker', function(Restangular) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				// TODO: Add in the API Call to File Mker for this ID.

				$scope.search = function() {
					alert('This will run the FM API call and return new results.');
				}

				$scope.useFMId = function() {
					alert('This will update the current record with the FM Profile ID');
				}
			},
			templateUrl: 'templates/user-filemaker-linker.html'
		};
	});

};