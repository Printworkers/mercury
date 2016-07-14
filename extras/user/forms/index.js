module.exports = function (myApp) {

	myApp.directive('userForms', function($rootScope, $SchemaModal) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope) {

				$scope.addTestForm = function() {

					var schema = {
                        type: 'object',
                        properties: {
                          form_key: {
                              type: 'string',
							  title: 'Form Key'
                          },
                          adobe_url: {
                            type: 'string',
							title: 'Adobe Url'
						  },
						  s3url: {
							  type: 'string',
							  title: 'S3 Url'
						  }
                        },
                        required: [ 'form_key', 'adobe_url', 's3url' ]
                      };

                      var form = [
                        '*',
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                      ];

					  var submit = function(form, data, close) {
						  $scope.user.addForm(data).then(function(result) {
							  // Close the modal.
							  close();
						  });
					  };

					  $SchemaModal.open('Add Adobe Form', {}, schema, form, submit);
				};

				$scope.delete = function() {
					alert('Coming soon');
				};

				$scope.download = function() {
					alert('Coming soon');
				};

				$scope.data = $scope.user.forms;
			},
			template: './list.html'
		};
	});
};
