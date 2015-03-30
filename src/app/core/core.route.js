(function() {
  'use strict';

  angular
    .module('app.core')
    .config(coreConfig);

  coreConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

  function coreConfig($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('app', {
        url: '',
        abstract: true
      });

    $urlRouterProvider.otherwise('/');
  }
})();