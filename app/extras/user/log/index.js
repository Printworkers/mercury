module.exports = function (myApp) {

    myApp.directive('userQueueLogTable', [ '$DataServices', '$location', '$state', 'notification', function($DataServices, $location, $state, notification) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            controller: function($scope) {

                /* Query for the Queue items for this user. */
                var fetch = $scope.fetch = function() {
                    $DataServices.QueueLog.find( $scope.user._id ).then(function(data) {
                        $scope.data = data;
                    });
                };

                /* Query. */
                $scope.delete = function(item) {
                    if (confirm('Do you want to delete this queue log item?')) {
                        item.remove().then(function(data) {
                            notification.log('Removed a User Queue Log Entry', { addnCls: 'humane-flatty-success' });

                            var index = $scope.data.indexOf(item);
                            if (index > -1) $scope.data.splice(index, 1);
                        }, function(err) {
                            notification.log('Unable to remove User Queue Log Entry', { addnCls: 'humane-flatty-error' });
                        });
                    }
                };

                fetch();
            },
            template: require('./table.html')
        };
    }]);

};
