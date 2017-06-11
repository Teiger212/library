(function () {
  angular.module('library').service('bookService', function ($http) {
    this.get = searchText => {
      return $http.get(`/api/books/${searchText}`) 
    }
    this.getAll = () => {
      return $http.get('/api/books/') 
    }
    this.add = book => {
      return $http.post('/api/books', { book })
    }
  })
})()



    
