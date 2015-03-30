(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['users'];

  function HomePage(users) {
    var vm = this;
    vm.title = 'Home page';

    activate();

    //////////

    function activate() {
      console.log(users);
    }
  }
})();