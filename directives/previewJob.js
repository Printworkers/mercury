module.exports = function(myApp) {
    myApp.directive('previewJob', function(Restangular, $q, notification,
        $state) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                selection: '=',
                type: '@'
            },
            link: function(scope, element, attrs) {
                scope.showJob = function() {
                    window.alert('Feature Coming Soon');
                };
            },
            template: '<button class="btn btn-success btn-xs" ng-click="showJob()"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp; Live Preview</button>'
        };
    });
};