module.exports = function (nga) {
	/* Job */
    var job = nga.entity('job').identifier(nga.field('_id'));
    job.label('Jobs');

    job.listView()
    .title('Jobs')
    .perPage(50)
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('status')
        	.label('Job Status'),
        nga.field('fmJobId')
        	.label('FM Id'),
        nga.field('User.company').label('Company')
    ]).listActions([
    	'edit', 
    	'show',
    	'delete',
    	'<preview-job item="{{entry}}"></preview-job>'])
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
            nga.field('city')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('state')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('description', 'wysiwyg').validation({required: true }),

            // New Fields.
            nga.field('calc_region')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('calc_size_descripts')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('calc_web_description')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('calc_work_type')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('date_web')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('dept_code')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('dept_code_name')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('dept_code_name_duplicate')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('duration')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('flag_full_time')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('fmClientId')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('id_employee_recruiter')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),    
            nga.field('fmJobId')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('fnOfficeId')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('rate_range')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('region')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('salary_range')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('shifts')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),    	
            nga.field('shifts_WorkType')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('skills')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('staff_recruiter')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('state')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('web_description')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('web_office')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('web_other_city')
            	.validation({required: true })
            	.cssClasses('col-sm-4')
           ]);

    job.showView().fields(job.editionView().fields());

    return job;
};