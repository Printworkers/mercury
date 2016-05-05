module.exports = function (nga, lookups) {
	var user = nga.entity('user').identifier(nga.field('_id'));

	user.listView()
	.title('Users')
	.fields([
		nga.field('firstname')
			.label('Name')
			.template(function(e) {
				return e.values.lastname + ', ' + e.values.firstname;
			}),
		nga.field('username'),
		nga.field('email'),
		nga.field('fmId')
			.label('FMId'),
		nga.field('type'),
		nga.field('lastLoginAt', 'date')
			.format('MM/dd/yyyy')
	]).listActions([
		'edit',
		'<user-manage user="entry"></user-manage>',
		// '<login-as-user item="entry"></login-as-user>',
		// '<fm-sync-job job="entry"></fm-sync-job>'
	])
	.filters([
		nga.field('firstname', 'template')
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
		nga.field('city', 'string').label('City'),
		nga.field('state', 'string').label('State')
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
			nga.field('firstname')
				.label('First Name')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter First Name' })
				.cssClasses('col-sm-4'),
			nga.field('lastname')
				.label('Last Name')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Last Name' })
				.cssClasses('col-sm-4'),
			nga.field('phone')
				.validation({ required: false })
				.attributes({ placeholder: 'Enter Phone Number' })
				.cssClasses('col-sm-4'),
			nga.field('company')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Company Name' })
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
				.cssClasses('col-sm-4'),
			nga.field('address_line1')
				.label('Address Line 1')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Street Address' })
				.cssClasses('col-sm-4'),
				nga.field('address_line2')
					.label('Address Line 2')
					.validation({required: true })
					.attributes({ placeholder: 'Enter Address Extra' })
					.cssClasses('col-sm-4'),
			nga.field('city')
				.validation({ required: false })
				.attributes({ placeholder: 'Enter Address City' })
				.cssClasses('col-sm-4'),
			nga.field('state', 'choice')
				.validation({ required: false })
				.attributes({ placeholder: 'Select a State' })
				.choices(lookups.states)
				.cssClasses('col-sm-4'),
			nga.field('zip')
				.validation({ required: false })
				.attributes({ placeholder: 'Select a Zip Code' })
				.cssClasses('col-sm-4'),
			nga.field('shortProfile', 'wysiwyg')
			 	.label('Short Profile')
				.validation({ required: false })
				.attributes({ placeholder: 'Select the user account type.' })
		]);

	user.editionView().fields(user.creationView().fields());

	return user;
};
