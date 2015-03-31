(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['users', '$filter'];

  function HomePage(users, $filter) {
    var vm = this;

    vm.users = users;

    //pagination
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = 10;
    vm.paginationChanged = paginationChanged;

    //order
    vm.orderBy = orderBy;
    vm.order = 'id';
    activate();

    //////////

    function activate() {
      vm.totalItems = users.length;
      paginationChanged();
    }

    function paginationChanged() {
      var begin = (vm.currentPage - 1) * vm.itemsPerPage;
      var end = begin + vm.itemsPerPage;
      vm.filteredUsers = vm.users.slice(begin, end);
    }

    function orderBy(newOrder) {
      if (newOrder === vm.order) {
        vm.order = '-' + newOrder;
      } else {
        vm.order = newOrder;
      }

      vm.users = $filter('orderBy')(vm.users, vm.order);
      vm.currentPage = 1;
      vm.paginationChanged();
    }
  }
})();