module.exports = function (nga, lookups) {
	var user = nga.entity('user').identifier(nga.field('_id'));

	user.listView()
	.title('Users')
	.fields([
		nga.field('firstname')
			.label('Name'),
		nga.field('username'),
		nga.field('email'),
		nga.field('fmId')
			.label('FMId'),
		nga.field('type'),
		nga.field('phone')
			.template(function(entity) {
				if (entity.values.phone) {
					return '{{' + (entity.values.phone || "Missing") + ' | tel }}';
				} else {
					return '<span class="label label-warning">Not yet</span>';
				}
			}),
		nga.field('lastLoginAt', 'date')
			.format('MM/dd/yyyy')
			//.label('Last Login')
	]).listActions([
		'edit',
		'<user-manage user="entry"></user-manage>',
		'<login-as-user item="entry"></login-as-user>',
		'<fm-sync-job job="entry"></fm-sync-job>'
	])
	.filters([
		nga.field('firstname', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
		nga.field('type').label('Type'),
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
				.choices([ { value: 'employer', label: 'Employer' }, { value: 'job seeker', label: 'Job Seeker' }, { value: 'administrator', label: 'Site Administrator' } ])
				.validation({required: true })
				.cssClasses('col-sm-4'),
			nga.field('firstname')
				.validation({required: true })
				.attributes({ placeholder: 'Enter first name' })
				.cssClasses('col-sm-4'),
			nga.field('lastname')
				.validation({required: true })
				.attributes({ placeholder: 'Select last name' })
				.cssClasses('col-sm-4'),
			nga.field('phone')
				.validation({required: true })
				.attributes({ placeholder: 'Enter Phone Number' })
				.cssClasses('col-sm-4'),
			nga.field('company')
				.validation({required: true })
				.attributes({ placeholder: 'Enter Company Name' })
				.cssClasses('col-sm-4'),
			nga.field('username')
				.validation({required: true })
				.attributes({ placeholder: 'Select username', autocomplete: "false" })
				.cssClasses('col-sm-4'),
			nga.field('password', 'password')
				.validation({required: true })
				.attributes({ placeholder: 'Select a password' })
				.cssClasses('col-sm-4'),
			nga.field('address_line1')
				.validation({required: true })
				.attributes({ placeholder: 'Select Street Address' })
				.cssClasses('col-sm-4'),
			nga.field('email')
				.validation({required: true })
				.attributes({ placeholder: 'Select Email Address' })
				.cssClasses('col-sm-4'),
			nga.field('city')
				.validation({required: false })
				.attributes({ placeholder: 'Enter Address City' })
				.cssClasses('col-sm-4'),
			nga.field('state', 'choice')
				.validation({required: false })
				.attributes({ placeholder: 'Select a State' })
				.choices(lookups.states)
				.cssClasses('col-sm-4'),
			nga.field('zip')
				.validation({required: false })
				.attributes({ placeholder: 'Select a zip code' })
				.cssClasses('col-sm-4'),
			nga.field('shortProfile', 'wysiwyg')
				.validation({required: false })
				.attributes({ placeholder: 'Select the user account type.' })
		]);

	user.editionView().fields(user.creationView().fields());
	
	return user;
};
