module.exports = function (nga, user) {
	/* Order */
	var skill = nga.entity('skill').identifier(nga.field('_id'));

	skill.listView()
	.title('Job Skills')
	.fields([
		nga.field('name'),
		nga.field('primary')
			.label('Primary Skill'),
		nga.field('secondary')
			.label('Secondary Skill'),
	]).listActions([])
	.filters([
		nga.field('q', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')
	]);

	skill.creationView()
		.title('Create new Skill')
		.fields([
			nga.field('primary').validation({ required: true }).cssClasses('col-sm-4'),
			nga.field('secondary').validation({ required: true }).cssClasses('col-sm-4'),
		]);

	skill.editionView().fields(skill.creationView().fields());

	return skill;
};