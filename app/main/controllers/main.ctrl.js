(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService',
            function($scope, $rootScope, $location, $window, userService) {
                $rootScope.serverAdd = "http://112.137.130.47:8080";
                $rootScope.clientAdd = "http://112.137.130.47:8100";
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
