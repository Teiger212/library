(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($http, $uibModalInstance, $timeout, bookService) {
    let vm = this
    vm.copyCount

    vm.ok = function () {
      let copiesArr = []
      for (var i = 0; i < vm.copyCount; ++i) {
        copiesArr.push({
          copyId: `${vm.ISBN}-${i + 1}`,
          isBorrowed: false
        })
      }
      const book = {
        ISBN: vm.ISBN,
        title: vm.title,
        authors: vm.author.split(','),
        genre: vm.genre.split(','),
        description: vm.description,
        copies: [...copiesArr],
        price: vm.price,
        imgSrc: vm.img
      }
      console.log(book)
      bookService.add(book)
        .then(result => {
          console.log(result.data.createdBook)
          vm.bookAddition = 'Book added'
          $timeout(function () {
            vm.cancel()
          }, 900)
        })
    }
    vm.cancel = function () {
      vm.dismiss({ $value: 'cancel' })
    }
  }

  module.component('addBookModal', {
    templateUrl: './components/addBookModal/addBookModal.comp.html',
    controller: ['$http', '$uibModal', '$timeout', 'bookService', controller],
    controllerAs: 'model',
    bindings: {
      close: '&',
      dismiss: '&'
    }
  })
})()
