module.exports = function (nga) {
	var user = nga.entity('user').identifier(nga.field('_id'));

    user.listView()
    .title('Users')
    .fields([
        nga.field('firstname'),
        nga.field('username'),
        nga.field('email'),
        nga.field('type'),
        nga.field('phone')
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

    user.creationView()
        .title('Create new User')
        .fields([
        	nga.field('type', 'choice')
        		.choices([ { value: 'employer', label: 'Employer' }, { value: 'job seeker', label: 'Job Seeker' } ])
        		.validation({required: true })
        		.cssClasses('col-sm-4'),
            nga.field('firstname').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('lastname').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('username').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('password').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('address1').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('email').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('city').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('state').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('zip').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('shortProfile', 'wysiwyg').validation({required: false })
        ]);

    user.editionView().fields(user.creationView().fields());
	
	return user;
};
