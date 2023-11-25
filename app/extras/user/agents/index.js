module.exports = function (myApp) {

    myApp.directive('userAgentsTable', function($DataServices) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            controller: function($scope) {
                $DataServices.Agent.find( $scope.user._id).then(function(data) {
                    $scope.data = data;
                });
            },
            template: require('./table.html')
        };
    });

    myApp.directive('addAgentModalButton', function($DataServices, $SchemaModal, salaryid, shiftid, skillid) {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            scope: {
                user: '='
            },
            controller: function($scope) {

                var salaryTitleMap = {};
                _.each(salaryid, function(obj) {
                    salaryTitleMap[obj.label] = obj.label;
                });

                var skillTitleMap = {};
                _.each(skillid, function(obj) {
                    skillTitleMap[obj.label] = obj.label;
                });

                var shiftTitleMap = {};
                _.each(shiftid, function(obj) {
                    shiftTitleMap[obj.label] = obj.label;
                });

                $scope.open = function() {

                    var schema = {
                        type: 'object',
                        properties: {
                          type: {
                              type: 'string',
                              title: 'Type',
                              required: true
                          },
                          name: {
                            type: 'string',
                            title: 'Name of Agent',
                            required: true
                          },
                          expirationDate: {
                              type: 'string',
                              title: 'Expiration Date'
                          },
                          salary: {
                              type: 'string',
                              title: 'Salary',
                          },
                          work: {
                              type: 'string',
                              title: 'Work Type'
                          },
                          shift: {
                              type: 'string',
                              title: 'Shift'
                          },
                          skill: {
                              type: 'string',
                              title: 'Skill'
                          }
                        },
                        required: [ '*' ]
                      };


                    var form = [
                        {
                            key: 'name',
                            type: 'text',
                            placeholder: 'Enter a name'
                        },
                        {
                            key: 'expirationDate',
                            type: 'text',
                            placeholder: 'Enter an Expiration Date'
                        },
                        {
                            key: 'type',
                            type: 'select',
                            placeholder: 'Enter a name',
                            titleMap: {
                              "job": "Job",
                              "staff": "Staff",
                            }
                        },
                        {
                            key: 'salary',
                            type: 'select',
                            placeholder: 'Enter a salary',
                            titleMap: salaryTitleMap
                        },
                        {
                            key: 'shift',
                            type: 'select',
                            placeholder: 'Select a shift',
                            titleMap: shiftTitleMap
                        },
                        {
                            key: 'skill',
                            type: 'select',
                            placeholder: 'Select a Skill',
                            titleMap: skillTitleMap
                        },
                        {
                            key: 'work',
                            type: 'select',
                            placeholder: 'Select a Job Type',
                            titleMap: {
                              "FT": "Full Time",
                              "PT": "Part Time",
                              "": "Any"
                            }
                        },
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                    ];

                    var submit = function(form, agent, close) {
                        agent.User = $scope.user._id;

                        agent.add().then(function(result) {
                             close();
                        });
                    };


                    $SchemaModal.open('Add Agent', $DataServices.Agent.new(), schema, form, submit);
                };
            },
            template: '<button ng-click="open();" class="btn btn-default">Add Agent</button>'
        };
    });
};
