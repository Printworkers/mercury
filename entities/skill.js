module.exports = function (nga, user) {
	/* Order */
	var skill = nga.entity('skill').identifier(nga.field('_id'));

	skill.listView()
	.title('Job Skills')
	.sortField('primary')
	.sortDir('DSC')
	.fields([
		nga.field('dept_code').label('Dept Code'),
		nga.field('primary')
			.label('Primary Skill'),
		nga.field('secondary')
			.label('Secondary Skills'),
	]).listActions([
		'edit', 'show'
	])
	.filters([
		nga.field('keywords', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')
	]);

	skill.showView()
		.title('FileMaker Job Skill')
		.description('This provides a way to create a new job skill.')
		.fields([
			nga.field('dept_code')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Department' })
				.cssClasses('col-sm-4'),
			nga.field('primary')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Primary Skill' })
				.cssClasses('col-sm-4'),
			nga.field('secondary', 'json')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Secondary Skill' })
				.cssClasses('col-sm-4')
		]);

	skill.creationView()
		.title('Create new Skill')
		.description('This provides a way to create a new job skill.')
		.fields([
			nga.field('dept_code')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Department' })
				.cssClasses('col-sm-4'),
			nga.field('primary')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Primary Skill' })
				.cssClasses('col-sm-4'),
			nga.field('secondary', 'json')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Secondary Skill' })
				.cssClasses('col-sm-4'),
		]);

	skill.editionView()
		.description('This provides a way to edit a job skill.')
		.fields(
			nga.field('dept_code')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Department' })
				.cssClasses('col-sm-6'),
			nga.field('primary')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Primary Skill' })
				.cssClasses('col-sm-4'),
			nga.field('secondary', 'json')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Secondary Skill' })
				.cssClasses('col-sm-8')
		);

	return skill;
};
