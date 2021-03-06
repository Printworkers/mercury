module.exports = function (nga, user) {
        /* Agent */
    var agent = nga.entity('agent').identifier(nga.field('_id'));

    agent.listView()
    .title('Staff & Job Agents')
    .sortField('createdAt')
    .sortDir('DSC')
    .fields([
        nga.field('name'),
        nga.field('User')
            .label('User')
            .template(function(entry) {
                if (!entry.values['User._id']) return 'NA';
                var name = entry.values['User.name_first'] + ' ' + entry.values['User.name_last'];
                var id = entry.values['User._id'];
                return '<a href="/#/user/details/'+id+'">' + name + '</a>';
            }),
        nga.field('type'),
        nga.field('status')
        	.label('Status'),
        nga.field('createdAt', 'date')
            .label('Created On')
            .format('MM/dd/yyyy'),
        nga.field('createdAt')
            .label('When')
            .template(function(e) {
                return moment(e.values.createdAt).fromNow();
            })
    ]).listActions([
    	'delete',
        '<agent-manage agent="entry"></agent-manage>'
    ])
    .filters([
        nga.field('keywords', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),
        nga.field('email', 'string').label('email'),
        nga.field('address_city', 'string').label('City'),
        nga.field('address_state', 'string').label('State')
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
                .targetField(nga.field('name_first')),
            // No Required Fields.
            nga.field('ExpirationDate').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('salary').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('skill').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('work').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('shift').validation({ required: false }).cssClasses('col-sm-4')
        ]);

    agent.editionView().fields(agent.creationView().fields());

    return agent;
};
