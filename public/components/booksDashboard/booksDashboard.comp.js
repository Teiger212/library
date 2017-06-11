(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($scope, $http, $uibModal, bookService) {
    var that = this

    this.showDetails = function (event, book) {
      event.preventDefault()
      $uibModal.open({
        animation: true,
        backdrop: 'static',
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'bookDetailsModal',
        size: 'lg',
        resolve: {
          data: book
        }
      })
    }

    this.searchForBooks = () => {
      bookService.get(that.searchText)
        .then(res => {
          that.books = res.data.books
        })
    }

    this.addBook = function (event) {
      event.preventDefault()
      $uibModal.open({
        animation: true,
        backdrop: 'static',
        size: 'lg',
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'addBookModal'
      })
    }
  };

  module.component('booksDashboard', {
    templateUrl: './components/booksDashboard/booksDashboard.comp.html',
    controllerAs: 'model',
    controller: ['$scope', '$http', '$uibModal', 'bookService', controller]
  })
})()
