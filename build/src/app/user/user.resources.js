(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('User', UserResource);

  UserResource.$inject = ['$resource'];

  function UserResource($resource) {
    var User = $resource('', {}, {
      query: {
        url: 'assets/mock/users.json',
        isArray: true
      }
    });
    return User;
  }
})();
