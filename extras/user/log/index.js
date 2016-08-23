module.exports = function (myApp) {

    myApp.directive('userQueueLogTable', function($DataServices, $location, $state) {
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
                        item.delete().then(function(data) {
                            var index = $scope.data.indexOf(item);
                            if (index > -1) $scope.data.splice(index, 1);
                        });
                    }
                };

                fetch();
            },
            template: require('./table.html')
        };
    });

};
