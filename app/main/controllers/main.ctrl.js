(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService',
            function($scope, $rootScope, $location, $window, userService) {
                $rootScope.serverAdd = "http://112.137.129.69:8180";
                $rootScope.clientAdd = "http://112.137.129.69:8080";
                $rootScope.srcAdd = "http://112.137.129.69:9000";
                if(sessionStorage['User-Data']){
                    $rootScope.loggedIn = true;
                    $rootScope.role = sessionStorage["role"];
                    $rootScope.id = sessionStorage["id"];
                    $rootScope.userName = sessionStorage["userName"];
                }

                $(document).ready(function() {
                    if (!$('.modal').is(':visible')) {
                        console.log(15);
                        $('.modal-backdrop').remove();
                    }
                });
                $('.modal').on('hidden.bs.modal', function() {
                    // do something…
                    console.log(21);
                    if (!$('.modal').is(':visible')) {
                        console.log(15);
                        $('.modal-backdrop').remove();
                    }
                })

                $scope.logout = function() {
                    userService.logout()
                        .then(function() {
                            sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd;
                        })
                }

            }
        ])
}());
