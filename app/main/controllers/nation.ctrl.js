(function() {
    var app = angular.module("nation", []);
    app.controller('nationCtrl', ['$scope', 'nationService', '$location', '$rootScope', '$window', '$timeout',
        function($scope, nationService, $location, $rootScope, $window, $timeout) {
            $scope.getAllContinent = function() {
                nationService.getAllContinent()
                    .then(function(response) {
                        $scope.allContinent = response.data;
                        // angular.forEach($scope.allContinent, function(continent){
                        //     // continent.count = continent.nation.length;
                        //     // console.log(continent.count);
                        // })
                        console.log(response.data);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createNation = function() {
                $scope.request = [{
                    nationName: $scope.input.nationName
                }]
                console.log($scope.request);
                nationService.createNation($scope.request, $scope.input.continentId)
                    .then(function(response) {
                        console.log(response);
                        $scope.success = true;
                        $timeout(function() {
                            // $scope.success = false;
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.success = false;
                            });
                        }, 3000);
                        $scope.input.nationName = "";
                        $scope.input.continentId = null;
                        $scope.getAllContinent();
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createContinent = function() {
                $scope.request = {
                    continentName: $scope.input.continentName
                }
                nationService.createContinent($scope.request)
                    .then(function(response) {
                        console.log(response)
                        $scope.success = true;
                        $timeout(function() {
                            // $scope.success = false;
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                $scope.success = false;
                            });
                        }, 3000);
                        $scope.getAllContinent();
                        $scope.input.continentName = "";
                    }, function(error) {
                        console.log(error);
                    })
            }
        }
    ])
}());
