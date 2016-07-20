module.exports = function (myApp) {

	var ctrl = function(queue, $scope, $stateParams) {
		$scope.tab = $stateParams.tab || 'details';
		$scope.queue = queue;
		$scope.optionsSuccessMessage = '';
		$scope.optionsErrorMessage = '';
	};

	var resolve = {
		queue: function($stateParams, $DataServices) {
			return $DataServices.Queue.get($stateParams.id);
		}
	};

	myApp.config(function($stateProvider) {
		$stateProvider.state('queue-detail', {
			parent: 'main',
			url: '/queue/details/:id',
			params: { id: null },
			resolve: resolve,
			controller: ctrl,
			controllerAs: 'controller',
			template: require('./tabs.html')
		});

		$stateProvider.state('queue-detail-tabs', {
			parent: 'main',
			url: '/queue/details/:id/:tab',
			params: { id: null, tab: null },
			resolve: resolve,
			controller: ctrl,
			controllerAs: 'controller',
			template: require('./tabs.html')
		});

	});

};
