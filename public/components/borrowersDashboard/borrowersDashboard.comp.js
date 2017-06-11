(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($scope, $http, $uibModal) {
    var that = this

    that.searchForBorrowers = function () {
      $http.get('/api/borrowers/' + that.searchText).then(function (res) {
        that.borrowers = res.data.borrowers
      })
    }

    that.addBorrowers = function () {
      event.preventDefault()
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'addBorrowerModal'
      })
    }

    this.openBorrowedBook = function () {
      console.log('YAY')
    }
  };

  module.component('borrowerDashboard', {
    templateUrl: './components/borrowersDashboard/borrowersDashboard.comp.html',
    controllerAs: 'model',
    controller: ['$scope', '$http', '$uibModal', controller]
  })
})()
