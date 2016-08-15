module.exports = function (nga, user, order) {
/* Application */
    var application = nga.entity('application').identifier(nga.field('_id'));
    application.listView()
    .title('Job Applications')
    .sortField('createdAt')
    .sortDir('DSC')
    .fields([
        nga.field('id_job'),
        nga.field('User.username').label('Owner'),
        nga.field('availableForTimes').label('Times?'),
        nga.field('availableImmediately').label('Available?'),
        nga.field('skillsMatch').label('Skills Match?'),
        nga.field('status').label('Status')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('keywords', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type')
    ]);

   	application.creationView()
        .title('Create new Job Application')
        .fields([
            nga.field('id_job')
                .validation({ required: true })
                .cssClasses('col-sm-4'),
            nga.field('User', 'reference')
                .validation({ required: true })
    			.targetEntity(user)
    			.targetField(nga.field('name_first')),
    		nga.field('coverLetter', 'text')
                .validation({ required: true })
                .label('Cover Letter')
                .defaultValue(true)
                .cssClasses('col-sm-8'),
            nga.field('availableForTimes', 'boolean')
                .validation({ required: true })
                .label('Available For Times?')
                .defaultValue(true),
            nga.field('availableImmediately', 'boolean')
                .validation({ required: true })
                .label('Available Immediately?')
                .defaultValue(true),
            nga.field('skillsMatch', 'boolean')
                .label('Do Skills Match?')
                .validation({ required: true })
                .defaultValue(true)
        ]);

    application.editionView().fields(application.creationView().fields());

    return application;
};
