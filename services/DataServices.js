module.exports = function(myApp) {

    myApp.factory('$DataServices', [ 'Restangular', '$q', function(Restangular, $q) {
        var Reference = Restangular.service('reference');
        var Education = Restangular.service('education');
        var Work = Restangular.service('work');
        var Document = Restangular.service('document');
        var User = Restangular.service('user');
        var Agent = Restangular.service('agent');
        var Queue = Restangular.service('queue');
        var HomeOffice = Restangular.service('homeoffice');

        var skill = Restangular.service('skill');
        var skills_cache = [];
        var homeoffice_cache = [];
        
        Restangular.extendModel('queue', function(model) {

            model.save = function(data) {
                return this.customPUT(data);
            };

            model.delete = function() {
                return Restangular.one('queue', this._id).remove();
            };

            model.add = function() {
                return Restangular.all('queue').post(this);
            };

            model.fetch = function() {
                return Restangular.all('queue').get();
            };

            return model;
         });

        Restangular.extendModel('agent', function(model) {

            model.save = function(data) {
                return this.customPUT(data);
            };

            model.delete = function() {
                return Restangular.one('agent', this._id).remove();
            };

            model.add = function() {
                return Restangular.all('agent').post(this);
            };

            model.fetch = function() {
                return Restangular.all('agent').get();
            };

            model.results = function() {
                return model.customGET('results').then(function(data) {
                    return data;
                });
            };

            model.refresh = function() {
                return model.customPOST(null, 'refresh').then(function(data) {
                    return data;
                });
            };

            return model;
         });

        Restangular.extendModel('user', function(model) {

            model.save = function(data) {
                return this.customPUT(data);
            };

            model.delete = function() {
                return Restangular.one('user', this._id).remove();
            };

            model.add = function() {
                return Restangular.all('user').post(this);
            };

            model.fetch = function() {
                return Restangular.all('user').get();
            };

            model.addForm = function(data) {
                return this.customPOST(data, 'addForm');
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
                    return Restangular.all('reference')
                        .getList({ User: User })
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
                }
            },
            Queue: {
                service: Queue,
                new: function(opts) {
                    var n =  Restangular.one('queue');
                    n.User = opts.User;
                    n.isNew = true;

                    return n;
                },
                find: function(User) {
                    return Restangular.all('queue')
                        .getList({ userId: User })
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
                },
                get: function(id) {
                    return Restangular.one('queue', id)
                        .get()
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
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
                    return Restangular.all('education')
                        .getList({ User: User })
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
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
                    return Restangular.all('work')
                        .getList({ User: User })
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
                }
            },
            User: {
                service: User,
                new: function() {
                    var n =  Restangular.one('user');
                    n.isNew = true;

                    return n;
                },
                get: function(id) {
                    return Restangular.one('user', id)
                        .get()
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
                }
            },
            Agent: {
                service: User,
                new: function() {
                    var n =  Restangular.one('agent');
                    n.isNew = true;

                    return n;
                },
                get: function(id) {
                    return Restangular.one('agent', id)
                        .get()
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
                },
                find: function(User) {
                    return Restangular.all('agent')
                        .getList({ User: User })
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
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
                    return Restangular.all('document')
                        .getList({ User: User })
                        .then(function(data) {
                            return data.data ? data.data : data;
                        });
                }
            },
            Skill: {
                all: function() {
                    if (!_.isEmpty(skills_cache)) {
                        var deferred = $q.defer();
                        deferred.resolve(skills_cache);
                        return deferred.promise;
                    }

                    return skill.getList().then(function(data) {
                        skills_cache = data;
                        return skills_cache;
                    });
                }
            },
            HomeOffice: {
                all: function() {
                    if (!_.isEmpty(homeoffice_cache)) {
                        var deferred = $q.defer();
                        deferred.resolve(homeoffice_cache);
                        return deferred.promise;
                    }

                    return HomeOffice.getList().then(function(data) {
                        homeoffice_cache = data;
                        return homeoffice_cache;
                    });
                }
            }
        };
    }]);
};
