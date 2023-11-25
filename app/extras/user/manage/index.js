module.exports = function (myApp) {

	myApp.directive('userManage', [ '$location', '$state', function ($location, $state) {
		return {
			restrict: 'E',
			scope: {
				user: '&'
			},
			link: function (scope) {
				var id = scope.user().values._id;

				scope.open = function () {
					$location.path('/user/details/' + id);
				};
			},
			template: '<button class="btn btn-success btn-xs" ng-click="open()"><i class="glyphicon glyphicon-pencil"></i> Manage</button>'
		};
	}]);

};
