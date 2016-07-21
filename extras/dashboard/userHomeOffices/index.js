module.exports = function(myApp) {

    myApp.directive('dashboardUserHomeOffices', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';
                Restangular.all('user').customGETLIST('count', { limit: 5, group: 'office' }).then(function(res) {
                    $scope.data = res.data;
                });
            },
			template: require('./section.html')
		};
	}]);
};
