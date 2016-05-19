module.exports = function (nga, user) {
/* -------------------------------------------------------- */
    /* Resumes */

    var resume = nga.entity('resume').identifier(nga.field('_id'));
    resume.listView()
    .title('Resumes')
    .fields([
        nga.field('User.username').label('Owner'),
        nga.field('createdAt').label('Created'),
        nga.field('publish').label('Published')
    ]).listActions(['edit', 'delete']);

   	resume.creationView()
        .title('Create new Resume')
        .fields([
            nga.field('User', 'reference')
    			.targetEntity(user)
    			.targetField(nga.field('name_first')),
    		nga.field('career_obj', 'wysiwyg').validation({ required: false }),
    		nga.field('special_skills', 'wysiwyg').validation({ required: false }),
    		nga.field('textResume', 'wysiwyg').validation({ required: false })
        ]);

    resume.editionView().fields(resume.creationView().fields());

    return resume;
};
