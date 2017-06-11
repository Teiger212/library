(function () {
  'use strict'

  var module = angular.module('library')

  function controller ($http, $scope, loginService, $state) {
    var that = this
    this.loginService = loginService
    this.logout = function () {
      loginService.isAuthenticated = false
      $state.go('login')
    }
  }

  module.component('navbar', {
    templateUrl: './components/navbar/navbar.comp.html',
    controllerAs: 'model',
    controller: ['$http', '$scope', 'loginService', '$state', controller]
  })
})()
