(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('selectableList', function(){
      return {
        scope: true,
        link: function($scope, $element, $attr) {
          var collectionName = $attr.selectableList;
          var targetName = $attr.selectedTarget;

          $scope.selectedHash = {};
          $scope.selectAll = false;

          $scope.$watch('selectAll', function(new_val){
            angular.forEach($scope[collectionName], function (item) {
              $scope.selectedHash[item.id] = new_val;
            });
          });

          $scope.$watchCollection('selectedHash', function(new_val){
            // do splice for all items instead creation new array for save link to parent scope object
            $scope[targetName].splice(0, $scope[targetName].length);
            angular.forEach(new_val, function (isSelected, id) {
              if(isSelected){
                $scope[targetName].push(parseInt(id, 10));
              }
            });
          });

          $scope.$watchCollection(collectionName, function (new_val, old_val) {
            if(new_val && old_val && new_val.length < old_val.length) {
              var ids = [];
              angular.forEach(new_val, function (item) {
                ids.push(item.id);
              });
              angular.forEach($scope.selectedHash, function (val, id) {
                if(ids.indexOf(id) == -1) {
                  delete $scope.selectedHash[id];
                }
              });
            }
          });
        }
      };
  });
})();