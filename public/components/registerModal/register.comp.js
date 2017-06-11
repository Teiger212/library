(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($http, $uibModalInstance) {
    let vm = this
    vm.greetings = 'Hi!'
    vm.cancel = function () {
      vm.dismiss({ $value: 'cancel' })
    }
  }

  module.component('registerUser', {
    templateUrl: './components/registerModal/register.comp.html',
    controller: ['$http', '$uibModal', controller],
    controllerAs: 'model',
    bindings: {
      close: '&',
      dismiss: '&'
    }
  })
})()
