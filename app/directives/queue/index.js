module.exports = function(myApp) {

    myApp.directive('totalQueueJobs', function(Restangular, $interval) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs) {
                scope.num = 20;
                scope.showSpinner = false;

                scope.fetch = function() {
                    scope.showSpinner = true;
                    Restangular.all('queue').customGETLIST('count', { group: 'status'}).then(function(res) {
                        scope.counts = res.data;
                        scope.showSpinner = false;
                    });
                };

                $interval(scope.fetch, 30000);

                scope.fetch();
            },
            template: require('./spans.html')
        };
    });

    myApp.directive('queueReport', function(Restangular, $interval, ModalService) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs) {
                scope.num = 20;
                scope.showSpinner = false;

                scope.show = function() {

                    ModalService.showModal({
						template: require('./modal.html'),
						controller: function($scope, close) {

                            $scope.showSpinner = true;
                            Restangular.all('queue').customGETLIST('count', { group: 'name,status'}).then(function(res) {
                                $scope.report1 = res;

                                $scope.showSpinner = false;
                            });
						}}).then(function(modal) {
							modal.close.then(function(result) {

							});

							$(modal.element).modal({ keyboard: false });
						});
                };

                scope.fetch = function() {
                    scope.showSpinner = true;
                    Restangular.all('queue').customGETLIST('count', { group: 'status'}).then(function(res) {
                        scope.counts = res.data;
                        scope.showSpinner = false;
                    });
                };

                $interval(scope.fetch, 30000);

                scope.fetch();
            },
            template: '<button ng-click="show();" class="btn btn-sm btn-primary">Reports</button>'
        };
    });
};
