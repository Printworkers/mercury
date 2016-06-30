module.exports = function(myApp) {

    myApp.directive('reQueueJobBtn', function(Restangular, $interval) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                entry: '='
            },
            link: function(scope, element, attrs) {
                scope.queue = scope.entry.values;
                scope.show = scope.queue.status != 'queued';
            },
            controller: function($scope) {
                $scope.runChange = function() {
                    if (confirm('Do you want to re-queue this job? It will run as soon as the worker is ready.')) {
                        $scope.entry.values.patch({ status: 'queued' }).then(function(data) {
                            $scope.entry.values.status = data.data.status;
                            console.log('Done, its ready to run again.', data);
                        });
                    }
                };
            },
            template: '<a Xng-if="show" class="btn btn-default btn-xs" ng-click="runChange()"><span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></a>'
        };
    });

};
