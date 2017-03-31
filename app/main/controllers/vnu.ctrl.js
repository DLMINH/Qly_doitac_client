(function() {
    var app = angular.module("vnu", []);
    app.controller('vnuCtrl', ['$scope', 'vnuService', '$location', '$rootScope', '$window', '$timeout', 'partnerService',
        function($scope, vnuService, $location, $rootScope, $window, $timeout, partnerService) {
            $scope.alertSuccess = function() {
                $scope.success = true;
                $timeout(function() {
                    // 
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        // $(this).remove();
                        $scope.success = false;
                    });
                }, 3000);
            }

            $scope.alertDanger = function(error) {
                $scope.danger = true;
                $scope.errorMessage = error;
                $timeout(function() {
                    // 
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        // $(this).remove();
                        $scope.danger = false;
                        $scope.errorMessage = "";
                    });
                }, 6000);
            }

            $scope.createUnit = function() {
                if ($scope.input.unitName != "") {
                    vnuService.createUnit($scope.input)
                        .then(function() {
                            $scope.alertSuccess();
                            $scope.input.unitName = "";
                            $scope.getAllUnit();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message);
                            // alert("Có lỗi xảy ra, hãy reload lại trang và thử lại");
                        })
                }

            }
            $scope.createUetMan = function() {
                if ($scope.input.uetManName != "") {
                    vnuService.createUetMan($scope.input)
                        .then(function() {
                            $scope.alertSuccess();
                            $scope.input.uetManName = "";
                            $scope.getAllUetMan();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message);
                            // alert("Có lỗi xảy ra, hãy reload lại trang và thử lại");
                        })
                }

            }
            $scope.createTypeContract = function() {
                if ($scope.input.typeContract != "") {
                    vnuService.createTypeContract($scope.input)
                        .then(function() {
                            $scope.alertSuccess();
                            $scope.input.typeContract = "";
                            $scope.getAllTypeContract();
                        }, function(error) {
                            console.log(error.data.message);
                            $scope.alertDanger(error.data.message);
                            // alert("Có lỗi xảy ra, hãy reload lại trang và thử lại");
                        })
                }

            }

            $scope.getAllTypeContract = function() {
                vnuService.getAllTypeContract()
                    .then(function(response) {
                        $scope.allTypeContract = response.data;
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllUetMan = function() {
                vnuService.getAllUetMan()
                    .then(function(response) {
                        console.log(response);
                        $scope.allUetMan = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllUnit = function() {
                vnuService.getAllUnit()
                    .then(function(response) {
                        console.log(response);
                        $scope.allUnit = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllPartner = function() {
                partnerService.getAllPartner()
                    .then(function(response) {
                        $scope.allPartner = response.data;
                    }, function(error) {
                        console.log(error)
                    })
            }

            $scope.getPartnerContact = function(partnerId) {
                partnerService.getAllPartnerContact(partnerId)
                    .then(function(response) {
                        $scope.allPartnerContact = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllContract = function() {
                vnuService.getAllContract()
                    .then(function(response) {
                        $scope.allContract = response.data;
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createContract = function() {
                if (($scope.input.partnerId + $scope.input.partnerContactId + $scope.input.unitNameId + $scope.input.uetManId + $scope.input.typeContractId + $scope.input.contentContract + $scope.input.funding) != "") {
                    vnuService.createContract($scope.input)
                        .then(function() {
                            $("#close_modal_create").trigger('click');
                            $scope.success = true;
                            $scope.input = [];
                            $timeout(function() {
                                // 
                                $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                    // $(this).remove();
                                    $scope.success = false;
                                });
                            }, 3000);
                            $scope.getAllContract();
                        }, function(error) {
                            console.log(error);
                        })
                }
            }

            $scope.setEditContract = function(contract) {
                $scope.editContractData = contract;
            }

            $scope.editContract = function() {
                vnuService.editContract($scope.editContractData, $scope.editContractData.id)
                    .then(function() {
                        $("#close_modal_edit").trigger('click');
                        $scope.success = true;
                        $scope.input = [];
                        $timeout(function() {
                            // 
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                // $(this).remove();
                                $scope.success = false;
                            });
                        }, 3000);
                        $scope.getAllContract();
                    }, function(error) {
                        console.log(error);
                    })
            }
            $scope.setDeleteContractId = function(contractId) {
                $scope.contractId = contractId;
            }
            $scope.deleteContract = function() {
                alert($scope.contractId);
                vnuService.deleteContract($scope.contractId)
                    .then(function() {
                        $("#close_modal_delete").trigger('click');
                        $scope.success = true;
                        $timeout(function() {
                            // 
                            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                                // $(this).remove();
                                $scope.success = false;
                            });
                        }, 3000);
                        $scope.getAllContract();
                    }, function (error){
                        console.log(error);
                    })
            }
        }
    ])
}());
