module.exports = function (myApp) {

	myApp.directive('agentManage', [ '$location', '$state', function ($location, $state) {
		return {
			restrict: 'E',
			scope: {
				agent: '&'
			},
			link: function (scope) {
				var id = scope.agent().values._id;
				scope.open = function () {
					$location.path('/agent/details/' + id);
				};
			},
			template: '<button class="btn btn-success btn-xs" ng-click="open()"><i class="glyphicon glyphicon-pencil"></i> Manage</button>'
		};
	}]);

};
