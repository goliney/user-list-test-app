(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['users', '$filter'];

  function HomePage(users, $filter) {
    var vm = this;

    vm.users = users;
    vm.usersFiltered = users;       // filtered and sorted users
    vm.usersShown = [];             // users to show on page

    //pagination
    var paginationBegin;
    var paginationEnd;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = 10;
    vm.paginate = paginate;

    //order
    vm.order = 'id';
    vm.orderBy = orderBy;

    //search
    vm.search = {};
    vm.filterBy = filterBy;

    activate();

    //////////

    function activate() {
      showUsers();
    }

    function showUsers() {
      var filtered = $filter('filter')(vm.users, vm.search);
      vm.usersFiltered = $filter('orderBy')(filtered, vm.order);
      paginate();
    }

    function paginate() {
      paginationBegin = (vm.currentPage - 1) * vm.itemsPerPage;
      paginationEnd = paginationBegin + vm.itemsPerPage;

      vm.totalItems = vm.usersFiltered.length;
      vm.usersShown = vm.usersFiltered.slice(paginationBegin, paginationEnd);
    }

    function orderBy(newOrder) {
      if (newOrder === vm.order) {
        vm.order = '-' + newOrder;
      } else {
        vm.order = newOrder;
      }

      vm.currentPage = 1;
      showUsers();
    }

    function filterBy() {
      vm.currentPage = 1;
      showUsers();
    }
  }
})();