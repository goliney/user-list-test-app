(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('infiniteScroll', infiniteScroll);

  infiniteScroll.$inject = ['$window'];
  
  function infiniteScroll($window) {
    return function(scope, element, attr) {
      var buffer = 100;
      var body = angular.element('body');

      angular.element($window).bind('scroll', function() {
        checkScroll();
      });

      scope.$on('infiniteScroll.recheck', function(e) {
        checkScroll();
      });

      function checkScroll() {
        if (body.prop('scrollHeight') - body.scrollTop() <= body.height() + buffer) {
          angular.element($window)[0].requestAnimationFrame(function(){
            // invoke the function passed into the 'infiniteScroll' attribute
            scope.$apply(attr.infiniteScroll);
            checkScroll();
          });
        }
      }
    };
  }

})();