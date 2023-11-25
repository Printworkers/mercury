module.exports = function (myApp) {

    myApp.directive('userQueueTable', function($DataServices, $location, $state, $timeout, notification) {
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
                            notification.log('Removed a User Queue item, ' + item.name, { addnCls: 'humane-flatty-success' });

                            var index = $scope.data.indexOf(item);
                            if (index > -1) $scope.data.splice(index, 1);
                        }, function(err) {
                            notification.log('Unable to remove a User Queue Entry', { addnCls: 'humane-flatty-error' });
                        });
                    }
                };

                $scope.edit = function(item) {
                    $state.go('queue-detail', { entity: 'queue', id: item._id });
                };

                $scope.cleanUp = function() {
                    var completed = _.where($scope.data, { status: 'complete' });
                    if (completed.length === 0) return alert('There are no comleted jobs to archive.');

                    if (confirm('You want to archive the ' + completed.length + ' completed tasks for this account?')) {
                        notification.log('Removing completed Queue item', { addnCls: 'humane-flatty-success' });

                        completed.forEach(function(job) {
                            notification.log('removing ' + job.name, { addnCls: 'humane-flatty-success' });
                            job.remove();
                        });

                        $timeout(fetch, 1000);
                    }
                };

                $scope.reQueueFails = function() {
                    var fails = _.where($scope.data, { status: 'failed' });
                    if (fails.length === 0) return alert('There are no failed jobs to queue again.');

                    if (confirm('You want to requeue the ' + fails.length + ' failed tasks for this account?')) {
                        fails = _.sortBy(fails, function(job){ return +moment(job.delay).unix(); });

                        fails.forEach(function(job) {
                            job.patch({ status: 'queued'}).then(function(data) {
                                notification.log('reQueuing ' + job.name, { addnCls: 'humane-flatty-success' });
                                job = data;
                            }, function(err) {
                                notification.log('failed to reQueuing ' + job.name, { addnCls: 'humane-flatty-error' });
                            });
                        });

                        $timeout(fetch, 1000);
                    }
                };

                fetch();
            },
            template: require('./table.html')
        };
    });

};
