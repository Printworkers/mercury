module.exports = function (myApp) {

	myApp.directive('queueManage', [ '$location', '$state', function ($location, $state) {
		return {
			restrict: 'E',
			scope: {
				queue: '&'
			},
			link: function (scope) {
				var id = scope.queue().values._id;
				scope.open = function () {
					$location.path('/queue/details/' + id);
				};
			},
			template: '<button class="btn btn-success btn-xs" ng-click="open()"><i class="glyphicon glyphicon-pencil"></i> Manage</button>'
		};
	}]);

};
