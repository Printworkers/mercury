module.exports = function (nga, user) {
        /* Agent */
    var agent = nga.entity('agent').identifier(nga.field('_id'));

    agent.listView()
    .title('Staff & Job Agents')
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('type'),
        nga.field('description')
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

    agent.creationView()
        .title('Create new Agent')
        .fields([
            nga.field('name')
                .validation({ required: true })
                .cssClasses('col-sm-8'),
            nga.field('type', 'choice')
                .choices([ { value: 'job', label: 'Job' }, { value: 'staff', label: 'Staff' } ])
                .validation( {required: true } )
                .cssClasses('col-sm-4'),
            nga.field('User', 'reference')
                .targetEntity(user) 
                .targetField(nga.field('firstname')),
            // No Required Fields.
            nga.field('city').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('country').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('ExpirationDate').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('salary').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('skill').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('worktype').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('state').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('shift').validation({ required: false }).cssClasses('col-sm-4')
        ]);

    agent.editionView().fields(agent.creationView().fields());

    return agent;
};
