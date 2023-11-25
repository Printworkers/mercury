module.exports = function(ngModule) {

ngModule.directive('semperShortProfile', function() {
    return {
      replace: true,
      template: require('./template.html'),
      controllerAs: 'ctrl',
      scope: {
        user: '='
      },
      controller: function ($scope) {
      }
    }
  });
};
