module.exports = function(myApp) {

	myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', 'apiUrl', function(NgAdminConfigurationProvider, RestangularProvider, apiUrl) {
		
		var nga = NgAdminConfigurationProvider;
		var lookups = require('../lookups');

		/* create an admin application. */
		var admin = nga.application('Semper LLC Administrator').baseApiUrl(apiUrl); 
		var homeoffice = require('../entities/homeoffice')(nga);
		var user = require('../entities/user')(nga, lookups, homeoffice);
		var agent = require('../entities/agent')(nga, user);
		var lookup = require('../entities/lookup')(nga);
		var job = require('../entities/job')(nga);
		var template = require('../entities/template')(nga, user);
		var order = require('../entities/order')(nga, user);
		var application = require('../entities/application')(nga, user, order);
		var skill = require('../entities/skill')(nga);

		admin.addEntity(user);
		admin.addEntity(lookup);
		admin.addEntity(job);
		admin.addEntity(template);
		admin.addEntity(agent);
		admin.addEntity(homeoffice);
		admin.addEntity(order);
		admin.addEntity(application);
		admin.addEntity(skill);

		/* Dashboard */
		admin.dashboard(nga.dashboard()
			.template('<div dashboard></div>')
		);

		/* Header */
		admin.header('<div header></div>');

	 	admin.menu(require('../menu')(nga, admin));

		nga.configure(admin);
	}]);

}