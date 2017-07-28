(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService', '$state',
            function($scope, $rootScope, $location, $window, userService, $state) {
                $rootScope.serverAdd = "http://localhost:8180";
                $rootScope.clientAdd = "http://localhost:8100";
                if(sessionStorage['User-Data']){
                    $rootScope.loggedIn = true;
                    $rootScope.role = sessionStorage["role"];
                    $rootScope.id = sessionStorage["id"];
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
