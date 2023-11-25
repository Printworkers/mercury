module.exports = function(myApp) {

    myApp.directive('dashboardUserCreatedAt', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';
                $scope.error = '';

                Restangular.all('user').customGET('report/createdat').then(function(res) {
                    $scope.data = _.sortBy(res.data.results, 'display');
                    $scope.error = '';
                }, function(err) {
                    $scope.error = 'Unable to fetch data';
                });

                $scope.query = function() {
                };

                $scope.refresh = function() {
                    $scope.query();
                };

                $scope.query();
            },
			template: require('./section.html')
		};
	}]);
};
