module.exports = function(myApp) {

    myApp.directive('dashboardApplicationCalendar', [ 'Restangular', '$q', function (Restangular, $q) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.query = function() {
                    var now = moment().hours(0).minutes(0).second(0).millisecond(0);
                    $q.all([
                        Restangular.all('application').getList({ createdAt: [ now.clone().format(), null ].join(',') }),
                        Restangular.all('application').getList({ createdAt: [ now.clone().add(-1, 'days').format(), now.clone().format() ].join(',') }),
                        Restangular.all('application').getList({ createdAt: [ now.clone().add(-7, 'days').format(), null ].join(',') }),
                        Restangular.all('application').getList({ createdAt: [ now.clone().add(-30, 'days').format(), null ].join(',') })
                    ])
                    .then(function(queries) {

                        $scope.results = {
                            today: queries[0].totalCount,
                            yesterday: queries[1].totalCount,
                            last7Days: queries[2].totalCount,
                            last30Days: queries[3].totalCount
                        };
                    });
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
