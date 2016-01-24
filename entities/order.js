module.exports = function (nga, user) {
/* Order */
    var order = nga.entity('order').identifier(nga.field('_id'));
    order.listView()
    .title('Orders')
    .fields([
        nga.field('name'),
        nga.field('type'),
        nga.field('User.company')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')
    ]);

   	order.creationView()
        .title('Create new Order')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('type').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('User', 'reference')
    			.targetEntity(user) 
    			.targetField(nga.field('firstname'))
        ]);

    order.editionView().fields(order.creationView().fields());

    return order;
};