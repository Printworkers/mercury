module.exports = function (nga, lookups) {

	var user = nga.entity('user').identifier(nga.field('_id'));

	user.listView()
	.title('Users')
	.sortField('lastLoginAt')
	.sortDir('DSC')
	.fields([
		nga.field('name_first')
			.label('Full Name')
			.template(function(e) {
				return e.values.name_first + ', ' + e.values.name_last;
			}),
		nga.field('username'),
		nga.field('email'),
		nga.field('id')
			.label('id_employee'),
		nga.field('type'),
		nga.field('createdAt', 'date')
			.label('Registered')
			.format('MM/dd/yyyy'),
		nga.field('createdAt')
			.label('When')
			.template(function(e) {
				return moment(e.values.createdAt).fromNow();
			}),
		nga.field('lastLoginAt', 'date')
			.label('Last Login')
			.format('MM/dd/yyyy'),
		nga.field('lastLoginAt')
			.label('When')
			.template(function(e) {
				return moment(e.values.lastLoginAt).fromNow();
			})
	]).listActions([
		'<user-manage user="entry"></user-manage>'
	])
	.filters([
		nga.field('keywords', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
		nga.field('type', 'choice')
				.label('Account Type')
				.choices([
					{ value: 'job seeker', label: 'Job Seeker' },
					{ value: 'employer', label: 'Employer' },
					{ value: 'administrator', label: 'Administrator' },
					{ value: 'super', label: 'Super Administrator' },
		]),
		nga.field('homeoffice', 'choice')
				.label('Home Office')
				.choices(lookups.homeoffice),
		nga.field('username', 'string').label('Username'),
		nga.field('email', 'string').label('email'),
		nga.field('address_city', 'string').label('City'),
		nga.field('address_state', 'string').label('State'),
		nga.field('id_employee', 'string').label('FM Employee Id')
	]);

	user.creationView()
		.title('Create new User Account')
		.description('Use this to create a new account. While you can create a job seeker or employer, their required fields can cause validation issues.')
		.fields([
			nga.field('type', 'choice')
				.defaultValue('job seeker')
				.attributes({ placeholder: 'Select the user account type.' })
				.choices([
					{ value: 'employer', label: 'Employer' },
					{ value: 'job seeker', label: 'Job Seeker' },
					{ value: 'administrator', label: 'Site Administrator' },
					{ value: 'super', label: 'Super Administrator' }
				])
				.validation({required: true })
				.cssClasses('col-sm-4'),
			nga.field('name_first')
				.label('First Name')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter First Name' })
				.cssClasses('col-sm-4'),
			nga.field('name_last')
				.label('Last Name')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Last Name' })
				.cssClasses('col-sm-4'),
				nga.field('name_middle')
					.label('Middle Name')
					.validation({ required: false })
					.attributes({ placeholder: 'Enter Middle Name' })
					.cssClasses('col-sm-4'),
			nga.field('phone')
				.validation({ required: false })
				.attributes({ placeholder: 'Enter Phone Number' })
				.cssClasses('col-sm-4'),
			nga.field('username')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Username', autocomplete: "false" })
				.cssClasses('col-sm-4'),
			nga.field('email')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter an Email' })
				.cssClasses('col-sm-4'),
			nga.field('password', 'password')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter a password' })
				.cssClasses('col-sm-4')
		]);

	return user;
};
