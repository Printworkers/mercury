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
	];

	var nameChoices = [
		// Standard Worker tasks.
		{ value: 'userCreate', label: 'Create a Telent FM Account' },
		{ value: 'userPatch', label: 'Update User Information to FM' },
		{ value: 'userSignedForm', label: 'Send User Data to FM after signin' },
		{ value: 'userUpdateEmailStatus', label: 'Send FM Email Optout Status Change' },
		// Cron worker Tasks.
		{ value: 'emailRegistration', label: 'Send Registration Welcome email' },
		{ value: 'emailPasswordReset', label: 'Send Password Reset email' },
		{ value: 'emailPasswordUsername', label: 'Send Username reminder email' },
		{ value: 'emailNewPasscode', label: 'Send New Passcode email' },
		{ value: 'userDetermineHomeOffice', label: 'Calc the Closest Homeoffice' },
		{ value: 'userSignedForm', label: 'Transmit User Signed Form Data (Phase 1)' },
		{ value: 'handleAdobeSignedForm', label: 'Handle Adobe Callback Form Data (s3 etc)' },
		{ value: 'userStoreFormS3', label: 'Store Form S3 URL' },
		{ value: 'userStoreFormData', label: 'Store Form Data' },
		{ value: 'jobImports', label: 'Handle Job Imports' },
		{ value: 'userSyncSnapShot', label: 'User Snapshot for Filemaker'},
		{ value: 'createClient', label: 'Create a Client FM Account'},

		{ value: 'userEducationUpsert', label: 'Upsert for Resume Work Education' },
		{ value: 'userReferenceUpsert', label: 'Upsert for Resume Work Reference' },
		{ value: 'userWorkHistoryUpsert', label: 'Upsert for Resume Work History' },
		{ value: 'talentImports', label: 'Handle Talent Imports' }
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
			nga.field('queue')
				.validation({ required: true })
				.editable(false)
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
