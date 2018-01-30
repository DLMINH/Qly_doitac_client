(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window', 'userService', '$state', '$http', '$timeout', 'md5', 'vnuService',
            function($scope, $rootScope, $location, $window, userService, $state, $http, $timeout, md5, vnuService) {
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

                $scope.changePass = function() {
                    if ($scope.password.newPassword != null && $scope.password.newPassword != undefined &&
                        $scope.password.oldPassword != null && $scope.password.oldPassword != undefined) {
                        $scope.password.newPassword = md5.createHash($scope.password.newPassword || '');
                        $scope.password.oldPassword = md5.createHash($scope.password.oldPassword || '');
                        vnuService.changePassword($scope.password)
                            .then(function(response) {
                                $scope.alertSuccess("Đổi mật khẩu thành công!", "successdelete_edit");
                                // $scope.password = {};
                            }, function(error) {
                                $scope.alertDanger(error.data.message, "");
                                $scope.password = {};
                            })
                        // infoService.changePass($scope.password)
                        $scope.password = {};

                    }

                }

                $scope.alertDanger = function(error, danger) {
                    $scope.errorMessage = error;
                    if (danger == 'danger') {
                        $scope.danger_edit = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.danger_edit = false;
                            });
                        }, 6000);
                    } else {
                        $scope.danger = true;
                        $timeout(function() {
                            // 
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.danger = false;
                                $scope.errorMessage = "";
                            });
                        }, 6000);
                    }
                }

                $scope.alertSuccess = function(string, success) {
                    $scope.successMessage = string;
                    if (success == 'successdelete_edit') {
                        $scope.successdelete_edit = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.successdelete_edit = false;
                            });
                        }, 3000);
                    } else {
                        $scope.success = true;
                        $timeout(function() {
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.success = false;
                            });
                        }, 3000);
                    }

                }

            }
        ])
}());