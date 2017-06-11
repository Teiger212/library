(function () {
  angular.module('library')
    .service('loginService', function ($http) {
      this.isAuthenticated = false
      this.verify = function (email, password) {
        return $http.post('/api/login', { user: { email, password } })
      }
    })
})()
