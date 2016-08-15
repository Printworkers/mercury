module.exports = function (nga, user, order) {
/* Application */
    var application = nga.entity('application').identifier(nga.field('_id'));
    application.listView()
    .title('Job Applications')
    .sortField('createdAt')
    .sortDir('DSC')
    .fields([
        nga.field('title'),
        nga.field('User.username').label('Owner'),
        nga.field('fmJobId')
        	.label('FM Job Id'),
        nga.field('fmClientId')
        	.label('FM Client Id'),
        nga.field('status').label('Status')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('keywords', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

   	application.creationView()
        .title('Create new Job Application')
        .fields([
            nga.field('title').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('User', 'reference')
    			.targetEntity(user)
    			.targetField(nga.field('name_first')),
    		nga.field('Order', 'reference')
    			.targetEntity(order)
    			.targetField(nga.field('name')),
    		 nga.field('description').validation({ required: false }).cssClasses('col-sm-8'),
        ]);

    application.editionView().fields(application.creationView().fields());

    return application;
};
