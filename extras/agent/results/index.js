module.exports = function (myApp) {

	myApp.directive('agentResults', function(notification, $DataServices) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				agent: '='
			},
			controller: function($scope, globallookups) {
				$scope.agent = $scope.agent;

				$scope.refresh = function() {
					$scope.agent.refresh().then(function(data) {
						$scope.agent.results().then(function(data) {
							$scope.results = data;
						});
					});
				};

				$scope.purge = function() {
					$scope.agent.purge().then(function(data) {
						$scope.agent.results().then(function(data) {
							$scope.results = data;
						});
					});
				};

				$scope.agent.results().then(function(data) {
					$scope.results = data;
				});
			},
			template: require('./table.html')
		};
	});

};
