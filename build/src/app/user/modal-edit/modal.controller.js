(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserModelEditController', UserModelEditController);

  UserModelEditController.$inject = ['$scope', '$modalInstance', 'userInstance'];

  function UserModelEditController($scope, $modalInstance, userInstance) {
    $scope.user = userInstance;

    $scope.ok = function () {
      $modalInstance.close($scope.user);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();