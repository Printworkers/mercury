module.exports = function (nga, lookups) {

    var homeoffice = nga.entity('homeoffice').identifier(nga.field('_id'));

    homeoffice.label('Home Offices');

    homeoffice.listView()
    .title('Home Offices')
    .sortField('name_office')
    .sortDir('DSC')
    .fields([
        nga.field('name_office').label('Name'),
        nga.field('id_office').label('Id'),
        nga.field('phone_main').label('Phone'),
        nga.field('city'),
        nga.field('state'),
        nga.field('createdAt')
            .label('Imported')
            .template(function(e) {
                return moment(e.values.createdAt).fromNow();
            })
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

   	homeoffice.creationView()
        .title('Create new Home Office')
        .fields([
            nga.field('name_office').validation({ required: true }).cssClasses('col-sm-8'),
            nga.field('city').validation({ required: true }).cssClasses('col-sm-4'),
            nga.field('state', 'choice')
                .choices(lookups.states)
                .validation({ required: true }).cssClasses('col-sm-4'),
            nga.field('phone_main').validation({ required: false }).cssClasses('col-sm-4'),
        ]);

    homeoffice.editionView().fields(homeoffice.creationView().fields());

    return homeoffice;
};
