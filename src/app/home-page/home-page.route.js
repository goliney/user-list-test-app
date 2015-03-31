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
          // delay resolver delays page load to 5 secs
          delay: ['$http', function($http) {
            return $http.get('http://httpbin.org/delay/5');
          }]
        }
      });
  }
})();