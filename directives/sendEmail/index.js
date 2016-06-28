module.exports = function(myApp) {

    myApp.directive('sendEmail', function(Restangular, $interval, ModalService) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                template: '&'
            },
            link: function(scope, element, attrs) {
            },
            controller: function($scope) {

                $scope.show = function() {
                    ModalService.showModal({
                        template: require('./modal.html'),
                        inputs: {
                            template: $scope.template().values
                        },
                        controller: function($scope, template, close) {
                            $scope.template = template;

                            $scope.data = {
                                to: '',
                                user: ''
                            };

                            $scope.sendEmail = function() {

                                template.customPOST($scope.data, 'test', function(data) {
                                    console.log('here we are', data);
                                }, function(err) {
                                    console.log('err', err);
                                });
                            };
                        }}).then(function(modal) {
                            modal.close.then(function(result) {});

                            $(modal.element).modal({ keyboard: false });
                        });
                };
            },
            template: '<a class="btn btn-default btn-xs" ng-click="show()"> <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Send</a>'
        };
    });


};
