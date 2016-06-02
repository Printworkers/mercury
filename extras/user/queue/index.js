module.exports = function (myApp) {

    myApp.directive('userQueueTable', function($DataServices) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            controller: function($scope) {
                $DataServices.Queue.find( $scope.user._id ).then(function(data) {
                    $scope.data = data;
                });
            },
            template: require('./table.html')
        };
    });

};
