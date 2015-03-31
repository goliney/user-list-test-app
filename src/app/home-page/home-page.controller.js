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
    vm.ageRange = null;
    vm.ageRanges = [
      { min: 10, max: 20, name: '10-20' },
      { min: 20, max: 30, name: '20-30' },
      { min: 30, max: 40, name: '30-40' },
      { min: 40, max: 999, name: '40+' }
    ];
    vm.filterBy = filterBy;

    activate();

    //////////

    function activate() {
      showUsers();
    }

    function showUsers() {
      var filtered = $filter('filter')(vm.users, vm.search);
      var filteredByAge = filterAgeRange(filtered, vm.ageRange);
      vm.usersFiltered = $filter('orderBy')(filteredByAge, vm.order);
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
      // filters change
      vm.currentPage = 1;
      showUsers();
    }

    function filterAgeRange(items, ageRange) {
      var result = [];
      if (ageRange) {
        angular.forEach(items, function(item) {
          if (item.Age >= ageRange.min && item.Age <= ageRange.max) {
            result.push(item);
          }
        });
      } else {
        result = items;
      }
      return result;
    }
  }
})();