'use strict';
(function () {
  var module = angular.module('library')

  module.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('books', {
        name: 'book',
        url: '/',
        template: '<books-dashboard></books-dashboard>',
        // component: 'booksContainer',
        params: {
          requireLogin: true
        }
      })
      .state('borrowers', {
        url: '/borrowers',
        template: '<borrower-dashboard></borrower-dashboard>',
        // component: 'borrowerContainer',
        params: {
          requireLogin: true
        }
      })
      // .state('report', {
      //   url: '/report',
      //   templateUrl: '../templates/report.html',
      //   controller: 'reportCtrl',
      //   params: {
      //     requireLogin: true
      //   }
      // })
      .state('login', {
        url: '/login',
        template: '<loginb></loginb>',
        // templateUrl: '../components/login/login.html',
        // controller: 'loginCtrl',
        params: {
          requireLogin: false
        }
      })
  })
})()
