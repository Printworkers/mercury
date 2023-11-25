module.exports = function (myApp) {

    myApp.directive('editPasswordButton', function($DataServices, $SchemaModal) {
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
                          password: {
                            type: 'string',
                            title: 'Password'
                          },
                        },
                        required: [ '*' ]
                      };

                    var form = [
                        'password',
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                    ];

                    var submit = function(form, data, close) {
                        data.save({ password: data.password }).then(function() {
                            close();
                        });
                    };

                    $SchemaModal.open('User Password', $scope.user, schema, form, submit);
                };

            },
            template: '<button ng-click="open();" class="btn btn-default">Edit Password</button>'
        };
    });
};
