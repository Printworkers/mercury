module.exports = function(myApp) {

    myApp.factory('$DataServices', [ 'Restangular', function(Restangular) {
        var Reference = Restangular.service('reference');
        var Education = Restangular.service('education');
        var Work = Restangular.service('work');
        var Document = Restangular.service('document');
        var User = Restangular.service('user');

        Restangular.extendModel('user', function(model) {

            model.save = function() {
                return this.customPUT(this);
            };

            model.delete = function() {
                return Restangular.one('user', this._id).remove();
            };

            model.add = function() {
                return Restangular.all('user').post(this);
            };

            return model;
         });

        Restangular.extendModel('document', function(model) {

            model.save = function() {
                return this.customPUT(this);
            };

            model.delete = function() {
                return Restangular.one('document', this._id).remove();
            };

            model.add = function() {
                return Restangular.all('document').post(this);
            };

            return model;
         });

        Restangular.extendModel('reference', function(model) {

            model.save = function() {
                return this.customPUT(this);
            };

            model.delete = function() {
                return Restangular.one('reference', this._id).remove();
            };

            model.add = function() {
                return Restangular.all('reference').post(this);
            };

            return model;
         });

         Restangular.extendModel('education', function(model) {

             model.save = function() {
                 return this.customPUT(this);
             };

             model.delete = function() {
                 return Restangular.one('education', this._id).remove();
             };

             model.add = function() {
                 return Restangular.all('education').post(this);
             };

             return model;
         });

         Restangular.extendModel('work', function(model) {

             model.save = function() {
                 return this.customPUT(this);
             };

             model.delete = function() {
                 return Restangular.one('work', this._id).remove();
             };

             model.add = function() {
                 return Restangular.all('work').post(this);
             };

             return model;
         });

        return {
            Reference: {
                service: Reference,
                new: function(opts) {
                    var n =  Restangular.one('reference');
                    n.User = opts.User;
                    n.isNew = true;

                    return n;
                },
                find: function(User) {
                    return Restangular.all('reference').getList({ User: User });
                }
            },
            Education: {
                service: Education,
                new: function(opts) {
                    var n =  Restangular.one('education');
                    n.User = opts.User;
                    n.isNew = true;

                    return n;
                },
                find: function(User) {
                    return Restangular.all('education').getList({ User: User });
                }
            },
            Work: {
                service: Work,
                new: function(opts) {
                    var n =  Restangular.one('work');
                    n.User = opts.User;
                    n.isNew = true;

                    return n;
                },
                find: function(User) {
                    return Restangular.all('work').getList({ User: User });
                }
            },
            User: {
                service: User,
                new: function() {
                    var n =  Restangular.one('user');
                    n.isNew = true;

                    return n;
                }
            },
            Document: {
                service: Document,
                new: function(opts) {
                    var n =  Restangular.one('document');
                    n.User = opts.User;
                    n.isNew = true;

                    return n;
                },
                find: function(User) {
                    return Restangular.all('document').getList({ User: User });
                }
            },
        };
    }]);

};
