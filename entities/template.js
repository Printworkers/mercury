// var myTemplate = require('../templates/sendEmail.html');

module.exports = function (nga, user) {

	/* emailTemplate */
	var template = nga.entity('Template').identifier(nga.field('_id'));
	template.label('Templates');

	template.listView()
	.title('Templates')
	.fields([
		nga.field('name').label('Template Name'),
		nga.field('type').label('Type'),
		nga.field('createdAt', 'date')
			.format('MM/dd/yy')
			.label('Created'),
		nga.field('updatedAt', 'date')
			.format('MM/dd/yy')
			.label('Updated'),
		nga.field('custom_action')
			.label('')
			.template('<send-email post="entry"></send-email>')
	]).listActions(['edit', 'delete'])
	.filters([
		nga.field('q', 'template')
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
			nga.field('html', 'wysiwyg')
				.attributes({ placeholder: 'Enter an HTML template' })
				.validation({required: true }),
			nga.field('type')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter a type' })
				.cssClasses('col-sm-4')
		]);

	template
		.editionView()
		.description('Use this to edit an existing email template.')
		.fields(template.creationView().fields());

	return template;
};