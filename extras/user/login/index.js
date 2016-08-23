module.exports = function (myApp) {

	myApp.directive('userLogin', [ '$location', '$state', function ($location, $state) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				user: '&',
				class: '@'
			},
			link: function(scope) {
				scope.className = scope.class || 'btn-xs';

				scope.login = function () {
					// $location.path('/user/details/' + id);
					alert('sdf');
				};
			},
			template: '<button class="btn btn-success {{className}}" ng-click="login()"><i class="glyphicon glyphicon-pencil"></i> Login as User</button>'
		};
	}]);

};
