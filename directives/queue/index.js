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

};
