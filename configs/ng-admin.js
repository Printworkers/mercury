module.exports = function(myApp) {

	myApp.config(function($sceDelegateProvider, RestangularProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'http://admin.semperllc.com/**',
			'https://admin.semperllc.com/**'
		]);
	});

	myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', 'apiUrl', 'globallookups', function(NgAdminConfigurationProvider, RestangularProvider, apiUrl, globallookups) {

		var nga = NgAdminConfigurationProvider;
		var lookups = require('../lookups');

		/* create an admin application. */
		var admin = nga.application('Semper LLC Administrator').baseApiUrl(apiUrl);
		var homeoffice = require('../entities/homeoffice')(nga, lookups);
		var user = require('../entities/user')(nga, lookups, homeoffice);
		var agent = require('../entities/agent')(nga, user);
		var job = require('../entities/job')(nga);
		var template = require('../entities/template')(nga, user);
		var order = require('../entities/order')(nga, user);
		var application = require('../entities/application')(nga, user, order);
		var skill = require('../entities/skill')(nga);
		var queue = require('../entities/queue')(nga, user, globallookups);
		var talent = require('../entities/talent')(nga);
		var emailpreference = require('../entities/emailpreference')(nga, user);

		admin.addEntity(user);
		admin.addEntity(job);
		admin.addEntity(template);
		admin.addEntity(agent);
		admin.addEntity(homeoffice);
		admin.addEntity(order);
		admin.addEntity(application);
		admin.addEntity(skill);
		admin.addEntity(queue);
		admin.addEntity(talent);
		admin.addEntity(emailpreference);

		/* Dashboard */
		admin.dashboard(nga.dashboard()
			.template('<div dashboard></div>')
		);

		/* Header */
		admin.header('<div header></div>');
	 	admin.menu(require('../menu')(nga, admin));
		nga.configure(admin);
	}]);

};
