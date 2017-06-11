(function () {
  angular.module('library', ['ui.router', 'ui.bootstrap'])
    .run(function ($rootScope, $state, loginService) {
      $rootScope.$on('$stateChangeStart',
        function (event, toState, toStateParams) {
          if (toStateParams.requireLogin && !loginService.isAuthenticated) {
            $state.go('login')
            event.preventDefault()
          }
        })
    })
})()
