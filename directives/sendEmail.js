module.exports = function(myApp) {
    myApp.directive('sendEmail', ['$location',
        function($location) {
            return {
                restrict: 'E',
                scope: {
                    post: '&'
                },
                link: function(scope, nga) {
                    console.log(scope);
                    scope.send = function() {
                        $location.path('/sendPost/' + scope.post().values.id);
                    };
                },
                template: '<a class="btn btn-default btn-xs" ng-click="send()"> <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Send Test</a>'
            };
        }
    ]);
};