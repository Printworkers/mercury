module.exports = function (myApp) {

	myApp.directive('fmSyncJob', [ '$location', function ($location) {
		return {
			restrict: 'E',
			scope: { 
				user: '&' 
			},
			link: function (scope) {
				// var id = scope.user().values._id;

				// scope.open = function () {
				// 	$location.path('/job/details/' + id);
				// };
			},
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i>&nbsp;FM Sync</button>'
		};
	}]);

}