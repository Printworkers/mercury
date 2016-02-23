module.exports = function(myApp) {
    myApp.directive('loginAsUser', function(Restangular, $q, notification, $state) {
        'use strict';

        return {
            restrict: 'E',
            scope: {
                selection: '=',
                type: '@'
            },
            link: function(scope, element, attrs) {
            	scope.login = function() {
            		window.alert('Feature Coming Soon')
            	}
            },
            template: '<button class="btn btn-success btn-xs" ng-click="login()"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp; Login as</button>'
        };
    });
}