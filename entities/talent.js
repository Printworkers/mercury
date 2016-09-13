module.exports = function (nga) {
	/* talent */
    var talent = nga.entity('talent').identifier(nga.field('_id'));
    talent.label('Talent');

    talent.listView()
    .title('Talent')
    .perPage(50)
    .fields([
        nga.field('name_first'),
        nga.field('name_last'),
        nga.field('dept_primary_name').label('Skill'),
        nga.field('address_state'),
        nga.field('id_employee').label('Employee Id'),
        nga.field('office').label('Office'),
        nga.field('createdAt')
            .label('Imported')
            .template(function(e) {
                return moment(e.values.createdAt).fromNow();
            })
    ]).listActions([
    	'show',
    	'delete',
        '<preview-talent talent="entry"></preview-talent>',
        '<fm-sync-talent talent="entry"></fm-sync-talent>'
    ])
    .filters([
    	nga.field('keywords', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
    ]);

    talent.showView()
        .title('Talent Details')
        .fields([
            nga.field('name_first').cssClasses('col-sm-8'),
            nga.field('name_last').cssClasses('col-sm-8'),
            nga.field('address_city').cssClasses('col-sm-8'),
            nga.field('address_state').cssClasses('col-sm-8'),
            nga.field('email').cssClasses('col-sm-8'),
            nga.field('shifts').cssClasses('col-sm-8'),
            nga.field('skill_primary').label('Primary Skill').cssClasses('col-sm-8'),
            nga.field('id_office').cssClasses('col-sm-8'),
            nga.field('office').cssClasses('col-sm-8'),
            nga.field('id_employee').cssClasses('col-sm-8'),
            nga.field('web_profile').cssClasses('col-sm-8')
           ]);

    return talent;
};
