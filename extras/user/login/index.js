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
					if (confirm('Do you want to login as this user?')) {
						/* Call the user and get a token. */
						scope.user().getToken().then(function(result) {
							window.open('http://app.semperllc.com/#/?token=' + result.token);
						});
					}
				};
			},
			template: '<button class="btn btn-success {{className}}" ng-click="login()"><i class="glyphicon glyphicon-pencil"></i> Login as User</button>'
		};
	}]);

};
