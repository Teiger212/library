(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($http, $uibModal) {
    let vm = this
    vm.borrower = {
      ID: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: ''
    }

    vm.addBorrower = function () {
      $http.post('/api/borrowers',
        { data:
        {
          ID: vm.borrower.ID,
          name: vm.borrower.firstName + ' ' + vm.borrower.lastName,
          email: vm.borrower.email,
          phone: vm.borrower.phone,
          address: vm.borrower.address,
          borrowedBooks: []
        }
        }).then(function () {
          $uibModalInstance.dismiss('cancel')
        })
    }

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
  }
  module.component('addBorrowerModal', {
    templateUrl: './components/addBorrowerModal/addBorrowerModal.comp.html',
    controller: ['$http', '$uibModal', controller],
    controllerAs: 'model',
    bindings: {
      close: '&',
      dismiss: '&'
    }
  })
})()
