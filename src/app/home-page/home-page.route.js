(function() {
  'use strict';

  angular
    .module('app.home-page')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: '/',
        views: {
          'main@' : {
            templateUrl: 'home-page/home-page.tpl.html',
            controller: 'HomePageController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          users: ['User', function(User) {
            return User.query().$promise;
          }],
          // delay resolver delays page load to 3 secs
          delay: ['$q', function($q) {
            var interval = 3000;
            var deferred = $q.defer();
            setTimeout(function() {
              deferred.resolve();
            }, interval);
            return deferred.promise;
          }]
        }
      });
  }
})();