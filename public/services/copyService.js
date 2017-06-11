(function () {
  angular.module('library').service('copyService', function ($http) {
    this.borrow = (borrowerId, copyId) => {
      return $http.post('/api/borrowCopy', { data: { id: borrowerId, copyId: copyId } })
    }
    this.return = copy => {
      return $http.post('/api/returnCopy', { copy } )
    }
    this.remove = (copy, book) => {
      console.log(book.title + " in service");
      return $http.post('/api/removeCopy', { data: {copy, book} })
    }
  })
})()
