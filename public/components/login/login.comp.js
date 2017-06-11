// (function () {
//   'use strict'

//   var module = angular.module('library')

//   function controller ($scope, $http, $uibModal) {
//     var that = this
//     that.message = 'Hello'
//   }

//   module.component('loginb', {
//     templateUrl: './components/login/new_login.html',
//     controllerAs: 'model',
//     controller: ['$scope', '$http', '$uibModal', controller]
//   })
// })()

(function () {
  'use strict'
  var module = angular.module('library')

  function controller ($http, $scope, $uibModal, loginService, $state) {
    const vm = this
    vm.email = 'test1@gmail.com'
    vm.password = 'password'
    vm.loginError = false
    
    vm.login = function (event) {
      event.preventDefault()
      loginService.verify(vm.email, vm.password)
        .then(res => {
          if (res.data.message === 'YAY') {
            loginService.isAuthenticated = true
            vm.loginError = false
            $state.go('books')
          } else {
            vm.loginError = true
            loginService.isAuthenticated = false
          }
        })
    }

    this.register = function (event) {
      event.preventDefault()
      $uibModal.open({
        animation: true,
        backdrop: 'static',
        size: 'lg',
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'registerUser'
      })
    }
  }

  module.component('loginb', {
    templateUrl: './components/login/login.comp.html',
    controller: ['$http', '$scope', '$uibModal', 'loginService', '$state', controller],
    controllerAs: 'model'
  })
})()

