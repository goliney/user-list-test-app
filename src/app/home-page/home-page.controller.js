(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['users', '$scope', '$filter', '$modal'];

  function HomePage(users, $scope, $filter, $modal) {
    var vm = this;

    vm.users = users;
    vm.usersFiltered = users;           // filtered and sorted users
    vm.usersShown = [];                 // users to show on page

    //pagination
    var paginationBegin;
    var paginationEnd;
    var defaultItemsPerPage = 10;
    var infiniteScrollIncrement = 7;   // used on infinite scroll
    vm.paginationType = 'Classical';
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = defaultItemsPerPage;
    vm.paginate = paginate;
    vm.infiniteScroll = infiniteScroll;

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

    //selection
    vm.selection = [];    //selected user ids

    //operation
    vm.remove = removeSelectedUsers;
    vm.editInPlace = editInPlace;
    vm.editInModal = editInModal;

    activate();

    //////////

    function activate() {
      showUsers();

      $scope.$watch('vm.paginationType', function (newType) {
        if (newType === 'Classical') {
          vm.itemsPerPage = defaultItemsPerPage;
          vm.currentPage = 1;
          showUsers();
        } else {
          vm.currentPage = 1;
          $scope.$emit('infiniteScroll.recheck');
        }
      });
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

    function infiniteScroll() {
      if (vm.paginationType !== 'Infinite' || vm.itemsPerPage > vm.users.length) {
        return;
      }
      vm.itemsPerPage += infiniteScrollIncrement;
      showUsers();
    }

    // Operations on users

    function removeSelectedUsers() {
      if (!vm.selection.length) {
        return;
      }
      angular.forEach(vm.selection, function(id) {
        // in normal environment I would send delete requests and redraw the table
        // but here I just find user and remove it from array
        for (var i = vm.users.length - 1; i >= 0; i--) {
          var user = vm.users[i];
          if (vm.selection.indexOf(user.id) !== -1) {
            vm.users.splice(i, 1);
          }
        }
      });
      showUsers();
      $scope.$emit('infiniteScroll.recheck');
    }

    function editInPlace(user) {
      if (user._underEdition === true) {
        delete user._underEdition;
        showUsers();
      } else {
        user._underEdition = true;
      }
    }

    function editInModal(user) {
      var modalInstance = $modal.open({
        templateUrl: 'user/modal-edit/modal.tpl.html',
        controller: 'UserModelEditController',
        size: '',
        resolve: {
          userInstance: function () {
            return angular.copy(user);
          }
        }
      });

      modalInstance.result.then(function (editedUser) {
        // Normaly I would invoke .$save(), but we have no backend
        // So just change object and redraw
        angular.extend(user, editedUser);
        showUsers();
      }, function () {
        // cancel, do nothing
      });
    }
  }
})();