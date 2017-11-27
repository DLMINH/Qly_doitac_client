(function() {
    var app = angular.module("user", []);
    app.controller('userCtrl', ['$scope', 'userService', '$location', '$rootScope', '$window', 'md5', '$timeout',
        function($scope, userService, $location, $rootScope, $window, md5, $timeout) {
            $scope.login = function() {
                $scope.request = {
                    userName: $scope.input.username,
                    password: md5.createHash($scope.input.password || '')
                }
                userService.login($scope.request)
                    .then(function(response) {
                        sessionStorage.setItem("User-Data", response.data.token);
                        sessionStorage.setItem("role", response.data.role);
                        sessionStorage.setItem("id", response.data.id);
                        sessionStorage.setItem("userName", response.data.userName);
                        $window.location.href = $rootScope.clientAdd;
                    }, function(error) {
                        console.log(error);
                        if (error.data.indexOf("Wrong password") != -1) {
                            $scope.alertDanger("Wrong password!", "");
                        } else if (error.data.indexOf("Worng username") != -1) {
                            $scope.alertDanger("Worng username!", "");
                        } else {
                            $scope.alertDanger("Error", "");
                        }
                    })
                // sessionStorage.setItem("User-Data", "hoangkhanh");
                // $window.location.href = $rootScope.clientAdd;
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
                    }, 10000);
                } else {
                    $scope.success = true;
                    $timeout(function() {
                        $(".alert").fadeTo(500, 0).slideUp(500, function() {
                            $scope.success = false;
                        });
                    }, 10000);
                }

            }
        }
    ])
}());