module.exports = function (myApp) {

	var ctrl = function(agent, $scope, $stateParams) {
		$scope.tab = $stateParams.tab || 'details';
		$scope.agent = agent;
		$scope.optionsSuccessMessage = '';
		$scope.optionsErrorMessage = '';
	};

	var resolve = {
		agent: function($stateParams, $DataServices) {
			return $DataServices.Agent.get($stateParams.id);
		}
	};

	myApp.config(function($stateProvider) {
		$stateProvider.state('agent-detail', {
			parent: 'main',
			url: '/agent/details/:id',
			params: { id: null },
			resolve: resolve,
			controller: ctrl,
			controllerAs: 'controller',
			template: require('./tabs.html')
		});

		$stateProvider.state('agent-detail-tabs', {
			parent: 'main',
			url: '/agent/details/:id/:tab',
			params: { id: null, tab: null },
			resolve: resolve,
			controller: ctrl,
			controllerAs: 'controller',
			template: require('./tabs.html')
		});

	});

};
