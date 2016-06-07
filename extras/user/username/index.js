module.exports = function (myApp) {

    myApp.directive('editUsernameButton', function($DataServices, $SchemaModal) {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            scope: {
                user: '='
            },
            controller: function($scope) {

                $scope.open = function() {

                    var schema = {
                        type: 'object',
                        properties: {
                          username: {
                            type: 'string',
                            title: 'Username'
                          },
                        },
                        required: [ '*' ]
                      };

                    var form = [
                        'username',
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                    ];

                    var submit = function(form, data, close) {
                        data.save({ username: data.username }).then(function() {
                            close();
                        });
                    };

                    $SchemaModal.open('Edit Username', $scope.user, schema, form, submit);
                };

            },
            template: '<button ng-click="open();" class="btn btn-default">Edit Username</button>'
        };
    });
};
