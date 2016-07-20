module.exports = function (nga, user) {

	var queue = nga.entity('queue').identifier(nga.field('_id'));

	queue.label('Queue Jobs');

	var statusChoices = [
		{ value: 'queued', label: 'Queued' },
		{ value: 'dequeued', label: 'Dequeued' },
		{ value: 'complete', label: 'Complete' },
		{ value: 'failed', label: 'Failed' },
		{ value: 'cancelled', label: 'Cancelled' }
	];

	var queueChoices = [
		{ value: 'general', label: 'General Queue' },
		{ value: 'local', label: 'Local Queue' }
	];

	var nameChoices = [
		// Standard Worker tasks.
		{ value: 'userCreate', label: 'userCreate' },
		{ value: 'userPatch', label: 'userPatch' },
		{ value: 'userSignedForm', label: 'userSignedForm' },
		{ value: 'userUpdateEmailStatus', label: 'userUpdateEmailStatus' },
		// Cron worker Tasks.
		{ value: 'emailRegistration', label: 'emailRegistration' },
		{ value: 'emailPasswordReset', label: 'emailPasswordReset' },
		{ value: 'emailPasswordUsername', label: 'emailPasswordUsername' },
		{ value: 'emailNewPasscode', label: 'emailNewPasscode' },
		{ value: 'userDetermineHomeOffice', label: 'userDetermineHomeOffice' },
		{ value: 'userSignedForm', label: 'userSignedForm' },
		{ value: 'handleAdobeSignedForm', label: 'handleAdobeSignedForm' },
		{ value: 'userStoreFormS3', label: 'userStoreFormS3' },
		{ value: 'userStoreFormData', label: 'userStoreFormData' },
		{ value: 'jobImports', label: 'jobImports' },
		{ value: 'userSyncSnapShot', label: 'userSyncSnapShot'},
		{ value: 'createClient', label: 'createClient'},
		{ value: 'userEducationUpsert', label: 'userEducationUpsert' },
		{ value: 'userReferenceUpsert', label: 'userReferenceUpsert' },
		{ value: 'userWorkHistoryUpsert', label: 'userWorkHistoryUpsert' },
		{ value: 'talentImports', label: 'talentImports' }
	];

	queue.listView()
		.title('Queue Jobs')
		.perPage(50)
		.description('The following is a list of Queue Jobs. <total-queue-jobs></total-queue-jobs> <queue-report></queue-report>')
		.fields([
            nga.field('name'),
			nga.field('params.userId').label('User'),
			nga.field('status')
				.template(function(e) {
					var className = 'label-default';
					switch (e.values.status) {
						case 'queued':
							className = 'label-warning';
							break;
							case 'complete':
								className = 'label-success';
								break;
						case 'fail':
							className = 'label-danger';
							break;
					}
					return '<span class="label ' + className + '">' + e.values.status + '</span>';
				}),
            nga.field('enqueued', 'date').format('MM/dd/yyyy'),
			nga.field('delay')
				.label('When')
				.template(function(e) {
					return moment(e.values.delay).fromNow();
				}),
            nga.field('ended', 'date').format('MM/dd/yyyy'),
			nga.field('delay')
				.label('Source')
				.template(function(e) {
					if (e.values && e.values['params.order']) {
						return '<a class="btn" href="#/order/details/' + e.values['params.order'] + '/order-fulfillment">order</a>';
					} else {
						return '&nbsp;';
					}
				}),
		]).listActions([
			'show',
			'edit',
			'delete',
			'<re-queue-job-btn entry="entry"></re-queue-job-btn>'
		])
		.filters([
			nga.field('status', 'choice')
				.label('Status')
				.choices(statusChoices),
			nga.field('name', 'choice')
				.pinned(true)
				.label('Task Name')
				.choices(nameChoices),
			// nga.field('userId', 'reference')
			// 	.targetEntity(user)
			// 	.targetField(nga.field('username'))
			// 	.label('User')
		]);

	queue.showView()
		.title('Queue Details')
		.fields([
			nga.field('name'),
			nga.field('status'),
			nga.field('enqueued', 'date').format('MM/dd/yyyy HH:mm:ss'),
            nga.field('dequeued', 'date').format('MM/dd/yyyy HH:mm:ss'),
			nga.field('ended', 'date').format('MM/dd/yyyy HH:mm:ss'),
            nga.field('delay', 'date').format('MM/dd/yyyy HH:mm:ss'),
            nga.field('attempts'),
            nga.field('priority'),
            nga.field('timeout'),
			nga.field('params', 'json'),
			nga.field('result', 'json'),
			nga.field('error', 'json'),
			nga.field('stack')
				.template(function(e) {
					return e.values.stack || 'NA';
				})
		]);

   	queue.editionView()
		.title('Edit Queue Job')
		.description('This allows you to edit basic items in queue job.')
		.fields([
			nga.field('queue', 'choice')
				.validation({ required: true })
				.choices(queueChoices)
				.defaultValue('general')
				.cssClasses('col-sm-6'),
			nga.field('name', 'choice')
				.validation({ required: true })
				.choices(nameChoices)
				.defaultValue('cron')
				.cssClasses('col-sm-6'),
			nga.field('status', 'choice')
				.validation({ required: true })
				.choices(statusChoices)
				.cssClasses('col-sm-6'),
            nga.field('queue')
    			.validation({ required: true })
    			.cssClasses('col-sm-6'),
			nga.field('params', 'json')
    			.validation({ required: false })
    			.cssClasses('col-sm-9')
		]);

	queue.creationView()
		.title('Create new Queue Job')
		.description('This provides the ability to create a new job.')
		.fields([
			nga.field('queue')
				.editable(false)
				.defaultValue('general')
				.cssClasses('col-sm-4'),
			nga.field('name', 'choice')
				.validation({ required: true })
				.choices(nameChoices)
				.defaultValue('cron')
				.cssClasses('col-sm-4'),
			nga.field('status', 'choice')
				.validation({ required: true })
				.choices(statusChoices)
				.defaultValue('queued')
				.cssClasses('col-sm-4'),
			nga.field('params', 'json')
    			.validation({ required: false })
    			.cssClasses('col-sm-10')
		]);

	return queue;
};
