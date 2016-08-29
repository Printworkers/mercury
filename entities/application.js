module.exports = function (nga, user) {

    function truncate(value) {
        if (!value) return '';
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
    }

    /* Application */
    var application = nga.entity('application').identifier(nga.field('_id'));

    application.listView()
        .title('Job Applications')
        .sortField('createdAt')
        .sortDir('DSC')
        .fields([
            nga.field('id_job'),
            nga.field('User')
                .label('User')
                .template(function(entry) {
                    var name = entry.values['User.name_first'] + ' ' + entry.values['User.name_last'];
                    var id = entry.values['User._id'];
                    return '<a href="/#/user/details/'+id+'">' + name + '</a>';
                }),
            nga.field('availableForTimes').label('Times?'),
            nga.field('availableImmediately').label('Available?'),
            nga.field('skillsMatch').label('Skills Match?'),
            nga.field('status').label('Status'),
            nga.field('createdAt', 'date')
    			.label('Created')
    			.format('MM/dd/yyyy')
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
            nga.field('User')
                .editable(false)
    			.template(function(e) {
                    return '<a href="/#/user/details/'+ e.values['User._id'] +'">' + e.values['User.name_first'] + ' ' +  e.values['User.name_last'] + '</a>';
                }),
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
            nga.field('jobAcceptable', 'boolean')
                .validation({ required: true })
                .label('Job Acceptable?')
                .defaultValue(true),
            nga.field('skillsMatch', 'boolean')
                .label('Do Skills Match?')
                .validation({ required: true })
                .defaultValue(true),
            nga.field('email')
                .label('Contact Email'),
            nga.field('phoen')
                .label('Contact Phone')
        ]);

    application.editionView().fields(application.creationView().fields());

    return application;
};
