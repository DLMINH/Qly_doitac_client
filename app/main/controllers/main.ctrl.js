(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService',
            function($scope, $rootScope, $location, $window, userService) {
                $rootScope.serverAdd = "http://localhost:8080";
                $rootScope.clientAdd = "http://localhost:8100";
                if(sessionStorage['User-Data']){
                    $rootScope.loggedIn = true;
                }

                $scope.logout = function (){
                    userService.logout()
                        .then(function (){
                            sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd;
                        })
                }
            }
        ])
}());
