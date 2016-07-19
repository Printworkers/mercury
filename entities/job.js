module.exports = function (nga) {
	/* Job */
    var job = nga.entity('job').identifier(nga.field('_id'));
    job.label('Jobs');

    var homeoOffices = [
        { value: "atlanta", label: "Atlanta", id: '107' },
	    { value: "baltimore", label: "Baltimore", id: '109' },
	    { value: "boston", label: "Boston", id: '100' },
	    { value: "chicago", label: "Chicago", id: '103' },
	    { value: "dallas", label: "Dallas", id: '106' },
	    { value: "international", label: "International", id: '0' },
	    { value: "losAngeles", label: "Los Angeles", id: '108' },
	    { value: "minneapolisStPaul", label: "Minneapolis-St Paul", id: '120' },
	    { value: "newJersey", label: "New Jersey", id: '118' },
	    { value: "newYorkCity", label: "New York", id: '122' },
	    { value: "orangeCounty", label: "Orange County", id: '117'},
	    { value: "otherLocations", label: "Other Locations", id: '0' },
	    { value: "sanDiego", label: "San Diego", id: '121' },
	    { value: "sanFrancisco", label: "San Francisco", id: '114' },
	    { value: "santaClara", label: "Santa Clara", id: '115' }
    ];

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
    	'<preview-job job="entry"></preview-job>',
    	'<fm-sync-job job="entry"></fm-sync-job>'
    ])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('username', 'string').label('Username'),
        nga.field('id_office', 'choice')
            .label('Home Office')
            .choices([
                { label: "Atlanta", value: '107' },
                { label: "Baltimore", value: '109' },
                { label: "Boston", value: '100' },
                { label: "Chicago", value: '103' },
                { label: "Dallas", value: '106' },
                { label: "International", value: '0' },
                { label: "Los Angeles", value: '108' },
                { label: "Minneapolis-St Paul", value: '120' },
                { label: "New Jersey", value: '118' },
                { label: "New York", value: '122' },
                { label: "Orange County", value: '117'},
                { label: "Other Locations", value: '0' },
                { label: "San Diego", value: '121' },
                { label: "San Francisco", value: '114' },
                { label: "Santa Clara", value: '115' }
            ]),
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
