module.exports = function (nga, user) {

	var keyChoices = [
		{ value: 'userNewJobSeekerAccount', label: 'New Job Seeker Account' },
		{ value: 'userNewEmployerAccount', label: 'New Job Seeker Account' },

		{ value: 'userUsernameReminder', label: 'User Username Reminder' },
		{ value: 'userPasswordReminder', label: 'User Password Reminder' },
		{ value: 'userNewPassCode', label: 'User New Passcode'},
		// Draft Versions
		{ value: 'userNewJobSeekerAccount-Draft', label: 'New Job Seeker Account (Draft)' },
		{ value: 'userNewEmployerAccount-Draft', label: 'New Employer Account (Draft)' },

		{ value: 'userUsernameReminder-Draft', label: 'User userName Reminder (Draft)' },
		{ value: 'userPasswordReminder-Draft', label: 'User Password Reminder (Draft)' },
		{ value: 'userNewPassCode-Draft', label: 'User New Passcode (Draft)'}
	];

	/* emailTemplate */
	var template = nga.entity('template').identifier(nga.field('_id'));
	template.label('Email Templates');

	template.listView()
	.title('Templates')
	.description('These templates provide the ability to customize the email messages and data.')
	.fields([
		nga.field('emailKey').label('Key'),
		nga.field('name').label('Name'),
		nga.field('createdAt', 'date')
			.format('MM/dd/yy')
			.label('Created'),
		nga.field('updatedAt', 'date')
			.format('MM/dd/yy')
			.label('Updated')
	]).listActions([
		'edit',
		'delete',
		'<send-email template="entry"></send-email>'])
	.filters([
		nga.field('keywords', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
		nga.field('name').label('Type'),
	]);

	template.creationView()
		.title('Create new Email Template')
		.description('Use this to create a new email template.')
		.fields([
			nga.field('name')
				.attributes({ placeholder: 'Enter a name for this template' })
				.validation({ required: true })
				.cssClasses('col-sm-8'),
			nga.field('emailKey', 'choice')
				.choices(keyChoices)
				.label('Email Key')
				.attributes({ description: 'asdfasdf' })
				.validation({ required: true })
				.cssClasses('col-sm-8'),
			nga.field('subject')
				.label('Subject')
				.validation({ required: true })
				.cssClasses('col-sm-8'),
			nga.field('html', 'wysiwyg')
				.attributes({ placeholder: 'Enter an HTML template' })
				.validation({required: true }),
			nga.field('type')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter a type' })
				.cssClasses('col-sm-4'),
			nga.field('from', 'email')
				.validation({ required: true })
				.attributes({ placeholder: 'From Email' })
				.cssClasses('col-sm-4'),
			nga.field('fields', 'json')
				.validation({ required: false })
				.attributes({ placeholder: 'Enter fields for the email template' })
				.cssClasses('col-sm-8')
		]);

	template
		.editionView()
		.description('Use this to edit an existing email template.')
		.fields(template.creationView().fields());

	return template;
};
