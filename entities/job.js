module.exports = function (nga) {
	/* Job */
    var job = nga.entity('job').identifier(nga.field('_id'));
    job.label('Jobs');

    job.listView()
    .title('Jobs')
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('User.company').label('Company')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),	
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

    job.creationView()
        .title('Create new Job')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('city').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('state').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('description', 'wysiwyg').validation({required: true })
        ]);

    job.editionView().fields(job.creationView().fields());

    return job;
};