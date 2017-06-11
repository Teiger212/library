(function () {
  var module = angular.module('library').controller('reportCtrl', function ($scope, $http) {
    $scope.borrowedBooks
    $scope.activeBorrowers
    $scope.lateBooks
    $http.get('/api/getBorrowedBooks').then(function (res) {
      $scope.borrowedBooks = res.data.books
    })
    $http.get('/api/lateBooks').then(function (res) {
      $scope.lateBooks = res.data.books
    })
    $http.get('/api/activeBorrowers').then(function (res) {
      $scope.activeBorrowers = res.data.borrowers.filter(function (item) {
             	return item.borrowedBooks.length > 0
      })
    })
  })
})()
