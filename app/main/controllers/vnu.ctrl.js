(function() {
    var app = angular.module("vnu", []);
    app.controller('vnuCtrl', ['$scope', 'vnuService', '$location', '$rootScope', '$window', '$timeout', 'partnerService', 'filterFilter',
        function($scope, vnuService, $location, $rootScope, $window, $timeout, partnerService, filterFilter) {
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

            $scope.createUnit = function() {
                if ($scope.input.unitName != "") {
                    vnuService.createUnit($scope.input)
                        .then(function() {
                            $scope.alertSuccess("Tạo đơn vị thành công!", "");
                            $scope.input.unitName = "";
                            $scope.getAllUnitName();
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
                            $scope.alertSuccess("Tạo người kí kết (VNU-UET) thành công!", "");
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
                            $scope.alertSuccess("Tạo loại hợp đồng thành công!");
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
                        $scope.typeContract_currentPage = 1;
                        $scope.typeContract_totalItems = response.data.length;
                        $scope.typeContract_entryLimit = 5; // items per page
                        $scope.typeContract_noOfPages = Math.ceil($scope.typeContract_totalItems / $scope.typeContract_entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.typeContract_filtered = filterFilter($scope.allTypeContract, newVal);
                            $scope.typeContract_totalItems = $scope.typeContract_filtered.length;
                            $scope.typeContract_noOfPages = Math.ceil($scope.typeContract_totalItems / $scope.typeContract_entryLimit);
                            $scope.typeContract_currentPage = 1;
                        }, true);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllUetMan = function() {
                vnuService.getAllUetMan()
                    .then(function(response) {
                        console.log(response);
                        $scope.allUetMan = response.data;
                        $scope.uetMan_currentPage = 1;
                        $scope.uetMan_totalItems = response.data.length;
                        $scope.uetMan_entryLimit = 5; // items per page
                        $scope.uetMan_noOfPages = Math.ceil($scope.uetMan_totalItems / $scope.uetMan_entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.uetMan_filtered = filterFilter($scope.allUetMan, newVal);
                            $scope.uetMan_totalItems = $scope.uetMan_filtered.length;
                            $scope.uetMan_noOfPages = Math.ceil($scope.uetMan_totalItems / $scope.uetMan_entryLimit);
                            $scope.uetMan_currentPage = 1;
                        }, true);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllUnitName = function() {
                vnuService.getAllUnitName()
                    .then(function(response) {
                        console.log(response);
                        $scope.allUnit = response.data;
                        $scope.allUnit_currentPage = 1;
                        $scope.allUnit_totalItems = response.data.length;
                        $scope.allUnit_entryLimit = 5; // items per page
                        $scope.allUnit_noOfPages = Math.ceil($scope.allUnit_totalItems / $scope.allUnit_entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.allUnit_filtered = filterFilter($scope.allUnit, newVal);
                            $scope.allUnit_totalItems = $scope.allUnit_filtered.length;
                            $scope.allUnit_noOfPages = Math.ceil($scope.allUnit_totalItems / $scope.allUnit_entryLimit);
                            $scope.allUnit_currentPage = 1;
                        }, true);
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
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.editTypeContract = function(typeContractId) {
                var typeContract = $('#typeContract_' + typeContractId).text();
                $('#typeContract_' + typeContractId).html('<input id="typeContract_value_' + typeContractId + '" value="' + typeContract + '" style="border-radius:3px; border: 1px solid;" required/>')
                $('#edit_typeContract_' + typeContractId).hide();
                $('#save_edit_typeContract_' + typeContractId).show();
            }

            $scope.saveEditTypeContract = function(typeContractId) {
                // console.log(typeContractId);
                var typeContract = $('#typeContract_value_' + typeContractId).val();
                // console.log(v);
                if (typeContract != "") {
                    $scope.request = {
                            id: typeContractId,
                            typeContract: typeContract
                        }
                        // console.log($scope.request);
                    vnuService.editTypeContract($scope.request)
                        .then(function() {
                            $('#edit_typeContract_' + typeContractId).show();
                            $('#save_edit_typeContract_' + typeContractId).hide();
                            $('#typeContract_' + typeContractId).html(typeContract);
                            $scope.alertSuccess('Sửa loại hợp đồng thành công!', '');
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }
            }

            $scope.confirmDeleteTypeContract = function(typeContractId){
                // $('#confirm_delete_typeContract_' + typeContractId).html(''+
                //         '<button type="button" class="btn btn-default btn-xs" ng-click="cancerDeleteTypeContract(' + typeContractId +')">Hủy</button> ' +
                //         '<button type="button" class="btn btn-success btn-xs" ng-click="deletetypeContract(' + typeContractId + ')">Xác nhận</button>');
                $('#i_confirm_delete_typeContract_' + typeContractId).hide();
                $('#button_confirm_delete_typeContract_' + typeContractId).show();
                $('#button_delete_typeContract_' + typeContractId).show();
            }

            $scope.cancerDeleteTypeContract = function(typeContractId){
                $('#i_confirm_delete_typeContract_' + typeContractId).show();
                $('#button_confirm_delete_typeContract_' + typeContractId).hide();
                $('#button_delete_typeContract_' + typeContractId).hide();
            }

            $scope.deleteTypeContract = function(typeContractId){
                vnuService.deleteTypeContract(typeContractId)
                    .then(function (){
                        $scope.alertSuccess("Xóa loại hợp đồng thành công!", '');
                        // $('#tr_typeContract_' + typeContractId).remove();
                        $scope.getAllTypeContract();
                    }, function(error){
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.editUetMan = function(uetManId) {
                var uetMan = $('#uetMan_' + uetManId).text();
                $('#uetMan_' + uetManId).html('<input id="uetMan_value_' + uetManId + '" value="' + uetMan + '" style="border-radius:3px; border: 1px solid;" required/>')
                $('#edit_uetMan_' + uetManId).hide();
                $('#save_edit_uetMan_' + uetManId).show();
            }

            $scope.saveEditUetMan = function(uetManId) {
                // console.log(uetManId);
                var uetManName = $('#uetMan_value_' + uetManId).val();
                // console.log(v);
                if (uetManName != "") {
                    $scope.request = {
                            id: uetManId,
                            uetManName: uetManName
                        }
                        // console.log($scope.request);
                    vnuService.editUetMan($scope.request)
                        .then(function() {
                            $('#edit_uetMan_' + uetManId).show();
                            $('#save_edit_uetMan_' + uetManId).hide();
                            $('#uetMan_' + uetManId).html(uetManName);
                            $scope.alertSuccess('Sửa loại hợp đồng thành công!', '');
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }
            }

            $scope.confirmDeleteUetMan = function(uetManId){
                $('#i_confirm_delete_uetMan_' + uetManId).hide();
                $('#button_confirm_delete_uetMan_' + uetManId).show();
                $('#button_delete_uetMan_' + uetManId).show();
            }

            $scope.cancerDeleteUetMan = function(uetManId){
                $('#i_confirm_delete_uetMan_' + uetManId).show();
                $('#button_confirm_delete_uetMan_' + uetManId).hide();
                $('#button_delete_uetMan_' + uetManId).hide();
            }

            $scope.deleteUetMan = function(uetManId){
                vnuService.deleteUetMan(uetManId)
                    .then(function (){
                        $scope.alertSuccess("Xóa loại hợp đồng thành công!", '');
                        $scope.getAllUetMan();
                    }, function(error){
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.editUnitName = function(unitNameId) {
                var unitName = $('#unitName_' + unitNameId).text();
                $('#unitName_' + unitNameId).html('<input id="unitName_value_' + unitNameId + '" value="' + unitName + '" style="border-radius:3px; border: 1px solid;" required/>')
                $('#edit_unitName_' + unitNameId).hide();
                $('#save_edit_unitName_' + unitNameId).show();
            }

            $scope.saveEditUnitName = function(unitNameId) {
                // console.log(unitNameId);
                var unitName = $('#unitName_value_' + unitNameId).val();
                // console.log(v);
                if (unitName != "") {
                    $scope.request = {
                            id: unitNameId,
                            unitName: unitName
                        }
                        // console.log($scope.request);
                    vnuService.editUnitName($scope.request)
                        .then(function() {
                            $('#edit_unitName_' + unitNameId).show();
                            $('#save_edit_unitName_' + unitNameId).hide();
                            $('#unitName_' + unitNameId).html(unitName);
                            $scope.alertSuccess('Sửa loại hợp đồng thành công!', '');
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }
            }

            $scope.confirmDeleteUnitName = function(unitNameId){
                $('#i_confirm_delete_unitName_' + unitNameId).hide();
                $('#button_confirm_delete_unitName_' + unitNameId).show();
                $('#button_delete_unitName_' + unitNameId).show();
            }

            $scope.cancerDeleteUnitName = function(unitNameId){
                $('#i_confirm_delete_unitName_' + unitNameId).show();
                $('#button_confirm_delete_unitName_' + unitNameId).hide();
                $('#button_delete_unitName_' + unitNameId).hide();
            }

            $scope.deleteUnitName = function(unitNameId){
                vnuService.deleteUnitName(unitNameId)
                    .then(function (){
                        $scope.alertSuccess("Xóa loại hợp đồng thành công!", '');
                        $scope.getAllUnitName();
                    }, function(error){
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }
        }
    ])
}());
