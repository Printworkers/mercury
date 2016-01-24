module.exports = function (nga) {
	var lookup = nga.entity('lookup').identifier(nga.field('_id'));

    lookup.listView()
    .title('Lookup Options')
    .fields([
        nga.field('value'),
        nga.field('label'),
        nga.field('type'),
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type', 'choice')
        	.label('Type')
        	.choices([ 
    			{ value: 'industry', label: 'Industry' }, 
    			{ value: 'region', label: 'Region' },
    			{ value: 'source', label: 'Source' },
    			{ value: 'salary', label: 'Salary' },
    			{ value: 'shift', label: 'Shift' },
    			{ value: 'type', label: 'Type' } 
    		])
    ]);

    lookup.creationView()
        .title('Create new User')
        .fields([
        	nga.field('type', 'choice')
        		.choices([ 
        			{ value: 'industry', label: 'Industry' }, 
        			{ value: 'region', label: 'Region' },
        			{ value: 'source', label: 'Source' },
        			{ value: 'salary', label: 'Salary' },
        			{ value: 'shift', label: 'Shift' },
        			{ value: 'type', label: 'Type' } 
        		])
        		.validation({required: true })
        		.cssClasses('col-sm-4'),
            nga.field('value').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('label').validation({required: true }).cssClasses('col-sm-4')
        ]);

    lookup.editionView().fields(lookup.creationView().fields());

    return lookup;
};
/* Lookups */
	    