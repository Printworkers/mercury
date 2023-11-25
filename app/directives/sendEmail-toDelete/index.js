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

                            var fields = {};
                            _.each(template, function(v, k) {
                                if (_.isString(k) && k.indexOf('fields.') === 0) {
                                    fields[k.replace('fields.','')] = v;
                                }
                            });

                            $scope.data = {
                                to: 'stephan.smith.bc93@gmail.com',
                                // user: '',
                                data: JSON.stringify(fields)
                            };

                            $scope.sendEmail = function() {

                                var data = _.clone($scope.data);
                                data.data = JSON.parse(data.data);

                                template.customPOST(data, 'test', function(data) {
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
