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
                            title: 'File Maker Job Id',
                            required: true
                          },
                          coverLetter: {
                              type: 'string',
                              required: true,
                              title: 'Cover Letter'
                          },
                          availableForTimes: {
                              type: 'boolean',
                              default: true,
                              title: 'Available For Listed Times'
                          },
                          availableImmediately: {
                              type: 'boolean',
                              default: true,
                              title: 'Available Immediately?'
                          },
                          skillsMatch: {
                              type: 'boolean',
                              default: true,
                              title: 'Do skills Match?'
                          },
                          jobAcceptable: {
                              type: 'boolean',
                              default: true,
                              title: 'Job Acceptable'
                          }
                        },
                        required: [ '*' ]
                      };

                    var form = [
                        'id_job',
                        'skillsMatch',
                        'jobAcceptable',
                        'availableImmediately',
                        'availableForTimes',
                        {
                            "key": "coverLetter",
                            "type": "textarea",
                            "placeholder": "Enter a cover letter."
                        },
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                    ];

                    var submit = function(form, application, close) {
                        application.add($scope.user._id).then(function(data) {
                            close();
                        }, function(err) {
                            alert('ToDo: Got an error');
                            console.log(err);
                        });

                    };

                    $SchemaModal.open('Create a Job Application', $DataServices.Application.new(), schema, form, submit);
                };
            },
            template: '<button ng-click="open();" class="btn btn-default">Add Application</button>'
        };
    });
};
