module.exports = function (nga, user) {

    var emailpreference = nga.entity('emailpreference').identifier(nga.field('_id'));

    emailpreference.listView()
        .title('Email Preferences')
        .sortField('createdAt')
        .sortDir('DSC')
        .fields([
            nga.field('email'),
            nga.field('User.username').label('Owner'),
            nga.field('status').label('Status')
        ]).listActions(['edit', 'delete'])
        .filters([
        	nga.field('keywords', 'template')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('status', 'choice')
                .label('Status')
                .choices([
                    { value: 'out', label: 'Opted Out'},
                    { value: 'in', label: 'Opted In'}
                ])
        ]);

   	emailpreference.creationView()
        .title('Create new Email Preference')
        .fields([
            nga.field('email')
                .validation({ required: true })
                .cssClasses('col-sm-4'),
            nga.field('User', 'reference')
                .validation({ required: false })
    			.targetEntity(user)
    			.targetField(nga.field('name_first')),
    		nga.field('status', 'boolean')
                .validation({ required: true })
                .label('Status')
                .defaultValue(true)
                .cssClasses('col-sm-8')
        ]);

    emailpreference.editionView().fields(emailpreference.creationView().fields());

    return emailpreference;
};
