module.exports = function(ngModule) {

    ngModule.factory('$SchemaModal', function(ModalService, $q) {

        return {
            open: function(title, model, schema, form, submit) {
                // Just provide a template url, a controller and call 'showModal'.
                var modal = ModalService.showModal({
                  template: require('./modal.html'),
                  controller: function($scope, $element, title, model, schema, form, close) {
                      $scope.title = title || 'No Title';
                      $scope.model = model || {};
                      $scope.schema = schema || {};
                      $scope.form = form || {};

                      var closeModal = function() {
                        //  Manually hide the modal using bootstrap.
                        $element.modal('hide');

                        //  Now close as normal, but give 500ms for bootstrap to animate
                        close(null, 500);
                      };

                      $scope.submitForm = function(form, data) {
                          // First we broadcast an event so all fields validate themselves
                          $scope.$broadcast('schemaFormValidate');

                          // Then we check if the form is valid
                          if (form.$valid) {
                             submit(form, data, closeModal);
                          }
                      };
                  },
                  inputs: {
                      title: title,
                      model: model,
                      schema: schema,
                      form: form
                  }
                }).then(function(modal) {
                    // The modal object has the element built, if this is a bootstrap modal
                    // you can call 'modal' to show it, if it's a custom modal just show or hide
                    // it as you need to.
                    modal.element.modal();
                });

            }
        };
    });

};
