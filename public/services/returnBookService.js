(function () {
  angular.module('library').service('returnBookService', function ($http) {
    this.return = (copy) => {
      return $http.post('/api/returnborrowBook', { data: { copy } })
    }
  })
})()
