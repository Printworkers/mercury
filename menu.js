module.exports = function (nga, user) {

	// user
	// lookup
	// job
	// template
	// agent
	// homeoffice
	// order 
	// application
	// skill

	return nga.menu()
		.addChild(nga.menu()
			.title('Dashboards')
			.link('/dashboard')
			.icon('<span class="fa fa-desktop fa-fw"></span>')
		)
		.addChild(nga.menu()
			.title('Users')
			.icon('<span class="fa fa-users fa-fw"></span>')
			.active(function(path) {
				return path.indexOf('/user') === 0;
			})
			.addChild(nga.menu()
				.title('Talent')
				.link('/user/list?search={"type":"job seeker"}')
				.icon('<span class="fa fa-list fa-fw"></span>')) // no active() function => will never appear active
			.addChild(nga.menu()
				.title('Clients')
				.link('/user/list?search={"type":"employer"}')
				.icon('<span class="fa fa-list fa-fw"></span>'))
			.addChild(nga.menu()
				.title('Administrator')
				.link('/user/list?search={"type":"administrator"}')
				.icon('<span class="fa fa-map-marker fa-fw"></span>')) // no active() function => will never appear active
		)
		.addChild(nga.menu()
			.title('Jobs')
			.icon('<span class="fa fa-clone fa-fw"></span>')
			.link('/job/list')
		)
		.addChild(nga.menu()
			.title('Orders')
			.icon('<span class="fa fa-clone fa-fw"></span>')
			.link('/order/list')
		)
		.addChild(nga.menu()
			.title('Applications')
			.icon('<span class="fa fa-clone fa-fw"></span>')
			.link('/application/list')
		)
		.addChild(nga.menu()
			.title('Agents')
			.icon('<span class="fa fa-users fa-fw"></span>')
			.active(function(path) {
				return path.indexOf('/agent') === 0;
			})
			.addChild(nga.menu()
				.title('Job Agents')
				.link('/agent/list?search={"type":"job"}')
				.icon('<span class="fa fa-list fa-fw"></span>')) // no active() function => will never appear active
			.addChild(nga.menu()
				.title('Staff Agents')
				.link('/agent/list?search={"type":"staff"}')
				.icon('<span class="fa fa-list fa-fw"></span>'))
		)
		.addChild(nga.menu()
			.title('Site')
			.icon('<span class="fa fa-shopping-cart fa-fw"></span>')
			.active(function(path) {
				return path.indexOf('/homeoffice') === 0 || path.indexOf('/lookup') === 0 || path.indexOf('/skill') === 0;
			})
			.addChild(nga.menu()
				.title('Home Offices')
				.link('/homeoffice/list')
				.icon('<span class="fa fa-credit-card fa-fw"></span>'))
			.addChild(nga.menu()
				.title('Lookups')
				.link('/lookup/list')
				.icon('<span class="fa fa-usd fa-fw"></span>'))
			.addChild(nga.menu()
				.title('Skills')
				.link('/skill/list')
				.icon('<span class="fa fa-cubes fa-fw"></span>'))
			.addChild(nga.menu()
				.title('Email Templates')
				.link('/template/list')
				.icon('<span class="fa fa-cubes fa-fw"></span>'))
		)
	;
}