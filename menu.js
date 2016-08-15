module.exports = function (nga, user) {

	return nga.menu()
		.addChild(nga.menu()
			.title('Dashboards')
			.link('/dashboard')
			.icon('<span class="fa fa-desktop fa-fw"></span>')
		)
		.addChild(nga.menu()
			.title('FileMaker ')
			.link('/filemaker')
			.icon('<span class="fa fa-download fa-fw"></span>')
		)
		.addChild(nga.menu()
			.title('Users')
			.icon('<span class="fa fa-users fa-fw"></span>')
			.link('/user/list')
			.active(function(path) {
				return path.indexOf('/user') === 0;
			})
		)
		.addChild(nga.menu()
			.title('Jobs')
			.icon('<span class="fa fa-clone fa-fw"></span>')
			.link('/job/list')
		)
		.addChild(nga.menu()
			.title('Talent')
			.icon('<span class="fa fa-clone fa-fw"></span>')
			.link('/talent/list')
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
			.title('Job/Talent Agents')
			.icon('<span class="fa fa-search-plus fa-fw"></span>')
			.link('/agent/list')
			.active(function(path) {
				return path.indexOf('/agent') === 0;
			})
		)
		.addChild(nga.menu()
			.title('Queue')
			.link('/queue/list')
			.icon('<span class="fa fa-desktop fa-fw"></span>')
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
				.icon('<span class="fa fa-building fa-fw"></span>'))
			.addChild(nga.menu()
				.title('Skills')
				.link('/skill/list')
				.icon('<span class="fa fa-briefcase fa-fw"></span>'))
			.addChild(nga.menu()
				.title('Email Templates')
				.link('/template/list')
				.icon('<span class="fa fa-envelope fa-fw"></span>'))
		);

};
