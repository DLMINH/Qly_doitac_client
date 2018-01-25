(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService', '$state', '$http',
            function($scope, $rootScope, $location, $window, userService, $state, $http) {
                $rootScope.serverAdd = "http://localhost:8180";
                $rootScope.clientAdd = "http://localhost:8100";
                $scope.isLoading = function() {
                    return $http.pendingRequests.length > 0;
                };

                $scope.$watch($scope.isLoading, function(v) {
                    if (v) {
                        NProgress.start();
                    } else {
                        NProgress.done();
                    }
                });
                if (sessionStorage['User-Data']) {
                    $rootScope.loggedIn = true;
                    $rootScope.role = sessionStorage["role"];
                    $rootScope.id = sessionStorage["id"];
                    $rootScope.userName = sessionStorage["userName"];
                    $rootScope.user = JSON.parse(sessionStorage["user"]);
                    if ($rootScope.user.rolesAndSigningLevel.name != null) {
                        var a = $rootScope.user.rolesAndSigningLevel.name.split("-");
                        if (a[0] == "UNIT") {
                            $rootScope.user.rolesAndSigningLevel.name = "VNU-" + a[1];
                        }
                    }
                    console.log($rootScope.user);
                } else {
                    window.location.href = 'login';
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
                            NProgress.done();
                            sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd;
                        }, function(error) {

                            sessionStorage.clear();
                            $window.location.href = $rootScope.clientAdd;
                        })
                }

                $rootScope.confirmDelete = function(id, name) {
                    console.log(id)
                    $rootScope.confirmDeleteId = id;
                    $rootScope.confirmDeleteName = name;
                }
            }
        ])
}());