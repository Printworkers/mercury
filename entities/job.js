module.exports = function (nga) {
	/* Job */
    var job = nga.entity('job').identifier(nga.field('_id'));
    job.label('Jobs');

    job.listView()
    .title('Jobs')
    .perPage(50)
    .fields([
        nga.field('name').template(function(data) {
            return name;
        }),
        nga.field('state'),
        nga.field('id_job').label('Job Id'),
        nga.field('web_office').label('Office'),
        nga.field('duration').label('Duration')
    ]).listActions([
    	'edit',
    	'show',
    	'delete',
    	'<preview-job item="entry"></preview-job>',
    	'<fm-sync-job job="entry"></fm-sync-job>'
    ])
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

    job.editionView()
        .title('Create new Job')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('state')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            // New Fields.
            nga.field('web_description')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('date_web')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('dept_code')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('dept_code_name')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('duration')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('flag_full_time')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('id_client')
            	.cssClasses('col-sm-6'),
            nga.field('id_employee_recruiter')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('id_job')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('id_office')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('rate_range')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('region')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('salary_range')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('shifts')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('shifts_WorkType')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('skills')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('staff_recruiter')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('web_office')
            	.validation({required: true })
            	.cssClasses('col-sm-6'),
            nga.field('web_other_city')
            	.validation({required: true })
            	.cssClasses('col-sm-6')
           ]);

    job.showView().fields(job.editionView().fields());

    return job;
};
