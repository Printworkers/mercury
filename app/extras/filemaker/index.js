module.exports = function(myApp) {

    myApp.config(function($stateProvider) {
		$stateProvider.state('filemaker', {
			parent: 'main',
			url: '/filemaker',
			controller: function($scope) {},
			controllerAs: 'controller',
			template: require('./page.html')
		});
	});

};
