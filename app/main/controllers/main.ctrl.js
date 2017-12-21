(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService', '$state',
            function($scope, $rootScope, $location, $window, userService, $state) {
                $rootScope.serverAdd = "http://localhost:8180";
                $rootScope.clientAdd = "http://localhost:8100";
                if (sessionStorage['User-Data']) {
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
                // $rootScope.confirmDelete = function(id, name) {
                //     $rootScope.confirmDeleteId = id;
                //     $rootScope.confirmDeleteName = name;
                // }
            }
        ])
}());