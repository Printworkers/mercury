module.exports = function (myApp) {

    myApp.directive('userQueueTable', function($DataServices, $location, $state, $timeout) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            controller: function($scope) {

                /* Query for the Queue items for this user. */
                var fetch = $scope.fetch = function() {
                    $DataServices.Queue.find( $scope.user._id ).then(function(data) {
                        $scope.data = data;
                    });
                };

                /* Query. */
                $scope.delete = function(item) {
                    if (confirm('Do you want to delete this queue item?')) {
                        item.delete().then(function(data) {
                            var index = $scope.data.indexOf(item);
                            if (index > -1) $scope.data.splice(index, 1);
                        });
                    }
                };

                $scope.edit = function(item) {
                    $state.go('queue-detail', { entity: 'queue', id: item._id });
                };

                $scope.reQueueFails = function() {
                    var fails = _.where($scope.data, { status: 'failed' });
                    if (fails.length === 0) return alert('There are no failed jobs to queue again.');

                    if (confirm('You want to requeue the ' + fails.length + ' failed tasks for this account?')) {
                        var fails = _.sortBy(fails, function(job){ return +moment(job.delay).unix(); });

                        fails.forEach(function(job) {
                            job.patch({ status: 'queued'}).then(function(data) {
                                job = data;
                            });

                            console.log('got date', job.name, job.status, moment(job.enqueued).format('HH:MM ss'));
                        });

                        $timeout(fetch, 1000);;
                    }
                };

                fetch();
            },
            template: require('./table.html')
        };
    });

};
