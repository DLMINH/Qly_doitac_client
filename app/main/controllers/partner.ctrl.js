(function() {
    var app = angular.module("partner", []);
    app.controller('partnerCtrl', ['$scope', 'partnerService', 'nationService', '$location', '$rootScope', '$window', '$timeout',
        function($scope, partnerService, nationService, $location, $rootScope, $window, $timeout) {
            $scope.input = [];
            $scope.getAllPartner = function() {
                partnerService.getAllPartner()
                    .then(function(response) {
                        $scope.allPartner = response.data;
                    }, function(error) {
                        console.log(error)
                    })
            }

            $scope.getAllContinent = function() {
                nationService.getAllContinent()
                    .then(function(response) {
                        $scope.allContinent = response.data;
                        // angular.forEach($scope.allContinent, function(continent){
                        //     // continent.count = continent.nation.length;
                        //     // console.log(continent.count);
                        // })
                        console.log($scope.allContinent);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.showNation = function(continent) {
                // $scope.show_nation = true;
                $scope.Nations = JSON.parse(continent);

                // console.log(JSON.parse(continent));
            }

            $scope.createPartner = function() {
                if ($scope.input.nationId != null && $scope.input.partnerName != null) {
                    $scope.request = {
                        nationId: $scope.input.nationId,
                        partnerName: $scope.input.partnerName
                    }
                    console.log($scope.request);
                    partnerService.createPartner($scope.request)
                        .then(function(response) {
                            // $scope.success = true;
                            $timeout(function() {
                                // $scope.success = false;
                                $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                    // $(this).remove();
                                });
                            }, 3000);
                            $scope.getAllPartner();
                            $scope.input.partnerName = "";
                            $scope.input.continent = null;
                            $scope.Nations = null;

                            $scope.editInfo = false;
                            $("#add_partner").fadeTo(500, 0).slideUp(500, function() {
                                // $(this).remove();
                            });
                        }, function(error) {
                            console.log(error);
                            alert("Có lỗi xảy ra, hãy thử reload lại trang và tạo tạo lại!");
                        })
                }
            }

            $scope.editPartner = function(partner) {
                // alert(1);
                console.log(partner);
                $scope.Partner = partner;

            }

            $scope.alert = function() {
                console.log(1);
            }

            $scope.editPartnerInfo = function() {
                $scope.Partner.partnerInfo.partnerId = $scope.Partner.id;
                // $scope.Partner.partnerInfo.nationId = $scope.Partner.id;
                partnerService.editPartnerInfo($scope.Partner.partnerInfo)
                    .then(function(response) {
                        console.log(response);
                        $("#close_modal").trigger('click');
                        $scope.success = true;
                        $timeout(function() {
                            // 
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                // $(this).remove();
                                $scope.success = false;
                            });
                        }, 3000);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.close = function(name) {
                alert(1)
                $("#" + name).fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();
                });
            }
        }
    ])
}());
