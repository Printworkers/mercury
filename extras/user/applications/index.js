module.exports = function (myApp) {

    myApp.directive('userApplicationsTable', function($DataServices) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            controller: function($scope) {
                $DataServices.Application.find( $scope.user._id ).then(function(data) {
                    $scope.data = data;
                });
            },
            template: require('./table.html')
        };
    });

    myApp.directive('addApplicationModalButton', function($DataServices, $SchemaModal) {
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
                          id_job: {
                            type: 'string',
                            title: 'Job Id'
                          },
                          coverLetter: {
                              type: 'string',
                              title: 'Cover Letter'
                          },
                          availableForTimes: {
                              type: 'string',
                              title: 'availableForTimes'
                          },
                          availableImmediately: {
                              type: 'string',
                              title: 'Available Immediately?'
                          },
                          skillsMatch: {
                              type: 'string',
                              title: 'skillsMatch'
                          },
                          jobAcceptable: {
                              type: 'string',
                              title: 'Job Acceptable'
                          }
                        },
                        required: [ '*' ]
                      };

                    var form = [
                        '*',
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                    ];

                    var submit = function(form, data, close) {
                        $scope.user.addApplication(data).then(function(result) {
                            // Close the modal.
                            alert('dddd');
                            close();
                        });
                    };

                    $SchemaModal.open('Add Application', $DataServices.Agent.new(), schema, form, submit);
                };
            },
            template: '<button ng-click="open();" class="btn btn-default">Add Application</button>'
        };
    });
};
