module.exports = function (nga) {
	/* emailTemplate */
    var template = nga.entity('Template').identifier(nga.field('_id'));
    template.label('Templates');

    template.listView()
    .title('Templates')
    .fields([
        nga.field('name'),
        nga.field('html'),
        nga.field('text'),
        nga.field('type'),
        nga.field('createdAt'),
        nga.field('updatedAt'),
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
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('html', 'wysiwyg').validation({required: true }),
            nga.field('type').validation({ required: true }).cssClasses('col-sm-4')
        ]);

    template.editionView().fields(template.creationView().fields());

    return template;
};