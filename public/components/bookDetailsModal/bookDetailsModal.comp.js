(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($scope, $http, $uibModal, $timeout, copyService) {
    var vm = this

    vm.$onInit = function () {
      vm.book = vm.resolve.data
    }

    vm.borrow = function (copy) {
      copy.errorBorrowing = false
      copyService.borrow(copy.borrowerId, copy.copyId)
        .then(result => {
          console.log(result);
          if (result.data.borrowedCopy) {
            let borrowedCopy = result.data.borrowedCopy
            copy.isBorrowed = borrowedCopy.isBorrowed
            copy.lastBorrower = borrowedCopy.lastBorrower
            copy.borrowedDate = borrowedCopy.borrowedDate
            copy.borrowerId = ''
            copy.errorBorrowing = false
          } else {
            copy.errorBorrowing = true
          }
        })
    }

    vm.returnCopy = function (copy) {
      copyService.return(copy)
      .then(() => {
        copy.isBorrowed = false
      })
      .catch(() => {
        console.log('FAIL')
      })
    }

    vm.deleteCopy = function (copy, book) {
      console.log('One te amo con toda mi cuerpo, corazon y mente');
      copyService.remove(copy, book)
        .then(result => vm.book = result.data.book)
    }

    vm.ok = function () {
      vm.close({$value: 'close'})
    }
  }

  module.component('bookDetailsModal', {
    templateUrl: './components/bookDetailsModal/bookDetailsModal.comp.html',
    controller: ['$scope', '$http', '$uibModal', '$timeout', 'copyService', controller],
    controllerAs: 'model',
    bindings: {
      resolve: '<',
      close: '&',
    }
  })
})()
