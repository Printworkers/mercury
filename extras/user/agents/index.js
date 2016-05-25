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

    myApp.directive('addAgentModalButton', function($DataServices, $SchemaModal) {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            scope: {
                user: '='
            },
            controller: function($scope) {

                $scope.open = function() {

                    // type				: { type : String, default: 'job', trim : true },
                	// name				: { type : String, default: '', trim : true },
                	// expirationDate		: { type : String, default: '', trim : true },
                	// email				: { type : String, default: '', trim : true },
                	// homeOffice			: { type : String, default: '', trim : true },
                	// skill				: { type : String, default: '', trim : true },
                	// worktype			: { type : String, default: '', trim : true },
                	// shift				: { type : String, default: '', trim : true },
                	// salary				: { type : String, default: '', trim : true },
                	// address_city		: { type : String, default: '', trim : true },
                	// address_zip			: { type : String, default: '', trim : true },
                	// address_state		: { type : String, default: '', trim : true },
                	// address_country		: { type : String, default: '', trim : true },
                	// contactInfo			: { type : String, default: '', trim : true },
                	// postingFlag			: { type : Boolean, default: false, trim : true },
                	// status 				: { type : String, default: 'open' },

                    var schema = {
                        type: 'object',
                        properties: {
                          type: {
                              type: 'string',
                              title: 'Type',
                              // enum: ['staff', 'job'],
                            //   titleMap: [
                            //       { value: "Andersson", name: "Andersson" },
                            //       { value: "Johansson", name: "Johansson" },
                            //       { value: "other", name: "Something else..."}
                            //     ]
                          },
                          name: {
                            type: 'string',
                            title: 'Name of Agent'
                          },
                          expirationDate: {
                              type: 'string',
                              title: 'Expiration Date'
                          },
                          salary: {
                              type: 'string',
                              title: 'Salary'
                          },
                          worktype: {
                              type: 'string',
                              title: 'Work type'
                          },
                          address_zip: {
                              type: 'string',
                              title: 'Address Zip'
                          },
                          status: {
                              type: 'string',
                              title: 'Status'
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
                        // $scope.user.addForm(data).then(function(result) {
                        //     // Close the modal.
                        alert('dddd');

                             close();
                        // });
                    };

                    $SchemaModal.open('Add Agent', $DataServices.Agent.new(), schema, form, submit);
                };

                // $DataServices.Agent.find( $scope.user._id).then(function(data) {
                //     $scope.data = data;
                // });
            },
            template: '<button ng-click="open();" class="btn btn-default">Add Agent</button>'
        };
    });
};
