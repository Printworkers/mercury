module.exports = function (nga) {
	/* HomeOffice */
    var homeoffice = nga.entity('homeoffice').identifier(nga.field('_id'));

    homeoffice.label('Home Offices');
    
    homeoffice.listView()
    .title('Home Offices')
    .fields([
        nga.field('name'),
        nga.field('fmOfficeId'),
        nga.field('phone'),
        nga.field('city'),
        nga.field('state')
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

   	homeoffice.creationView()
        .title('Create new Home Office')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('city').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('state').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('zip').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('emailAddress1').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('emailAddress2').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('phone').validation({required: false }).cssClasses('col-sm-4'),
        ]);

    homeoffice.editionView().fields(homeoffice.creationView().fields());
    
    return homeoffice;
};