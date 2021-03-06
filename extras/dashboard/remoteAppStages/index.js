module.exports = function(myApp) {

    myApp.directive('dashboardRemoteAppStages', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';
                Restangular.all('user').customGETLIST('count', { 'group': 'remoteAppStatus' }).then(function(res) {
                    $scope.data = res.data;
                    // console.log('dashboardRemoteAppStages', $scope.data.plain());
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
