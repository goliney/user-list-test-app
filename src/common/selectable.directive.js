(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('selectable', selectable);

  function selectable(){
    return {
      scope: true,
      link: function(scope, element, attr) {
        //TODO: refactor `vm`, `scope`
        var collectionName = attr.selectable;
        var targetName = attr.selectTarget;

        scope.selectedHash = {};
        scope.selectAll = false;

        scope.$watch('selectAll', function(newValue){
          angular.forEach(scope.vm[collectionName], function (item) {
            scope.selectedHash[item.id] = newValue;
          });
        });

        scope.$watchCollection('selectedHash', function(newValue){
          // clear array
          scope.vm[targetName].splice(0, scope.vm[targetName].length);
          angular.forEach(newValue, function (isSelected, id) {
            if(isSelected){
              scope.vm[targetName].push(parseInt(id, 10));
            }
          });
          if (!scope.vm[targetName].length) {
            scope.selectAll = false;
          }
        });

        scope.$watchCollection('vm.' + collectionName, function (newValue, oldValue) {
          var ids = [];
          angular.forEach(newValue, function (item) {
            ids.push(item.id);
          });
          angular.forEach(scope.selectedHash, function (val, id) {
            if(ids.indexOf(id) == -1) {
              delete scope.selectedHash[id];
            }
          });
        });
      }
    };
  }
})();