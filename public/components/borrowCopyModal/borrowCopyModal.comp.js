(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($scope, $http, $uibModalInstance, $timeout) {
    var that = this
    that.borrowerId = ''

    that.borrowCopy = function () {
      that.copy.status = 'Borrowed'
      $http.post('/api/borrowBook', { data: { id: that.borrowerId, copyId: that.copy.copyId, bookTitle: that.book.title } })
                .then(function () {
                  console.log('YAY')
                  $uibModalInstance.dismiss('cancel')
                }, function () {
                  console.log('fail')
                  $uibModalInstance.dismiss('cancel')
                })
    } // borrowCopy

    that.cancel = function () {
      that.dismiss({ $value: 'cancel' })
    }
  }

  module.component('borrowCopyModal', {
    templateUrl: './components/borrowCopyModal/borrowCopyModal.comp.html',
    controller: ['$scope', '$http', '$uibModal', '$timeout', controller],
    controllerAs: 'model',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    }
  })
})()
