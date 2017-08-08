(function() {
    var app = angular.module("nation", []);
    app.controller('nationCtrl', ['$scope', 'nationService', '$location', '$rootScope', '$window', '$timeout', '$state',
        function($scope, nationService, $location, $rootScope, $window, $timeout, $state) {
            $rootScope.currentUrl = $state.current.url;
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

            $scope.getAllContinent = function() {
                nationService.getAllContinent()
                    .then(function(response) {
                        $scope.allContinent = response.data;
                        console.log(response.data);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllNation = function() {
                nationService.getAllNation()
                    .then(function(response) {
                        $scope.allNations = response.data;
                        console.log(response.data);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.createNation = function() {
                $scope.request = {
                    nationName: $scope.input.nationName
                };
                console.log($scope.request);
                nationService.createNation($scope.request, $scope.input.continentId)
                    .then(function(response) {
                        console.log(response);
                        $scope.alertSuccess('Tạo Quốc gia thành công!', '');
                        $scope.input.nationName = "";
                        $scope.input.continentId = null;
                        $scope.getAllNation();
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
                        $scope.alertSuccess("Tạo Châu lục thành công!", "");
                        $scope.getAllContinent();
                        $scope.input.continentName = "";
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.showNation = function(continent) {
                console.log(continent);
                $scope.Continent = continent;
            }

            $scope.confirmDelete = function(id, name) {
                $scope.confirmDeleteId = id;
                $scope.confirmDeleteName = name;
            }

            $scope.deleteNation = function(nationId) {
                nationService.deleteNation(nationId)
                    .then(function() {
                        $scope.alertSuccess('Xóa Quốc gia thành công!', '');
                        // $('#tr_nation_' + nationId).remove();
                        var index = $scope.allNations.findIndex(x => x.id === nationId);
                        if(index != -1){
                            $scope.allNations.splice(index, 1);
                        }
                        $('#close_modal_delete_nation').trigger('click');
                    }, function(error) {
                        console.log(error);
                        $('#close_modal_delete_nation').trigger('click');
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.deleteContinent = function(continentId) {
                // $('#close_modal_delete_continent').trigger('click');
                nationService.deleteContinent(continentId)
                    .then(function() {
                        $scope.alertSuccess('Xóa Châu lục thành công!', '');
                        $scope.getAllContinent();
                        // $('#tr_nation_' + nationId).remove();
                        $('#close_modal_delete_continent').trigger('click');
                    }, function(error) {
                        console.log(error);
                        $('#close_modal_delete_continent').trigger('click');
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.editNation = function(nationId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                var nationName = $('#nation_' + nationId).text();
                $('#nation_' + nationId).html('<input id="nation_value_' + nationId + '" value="' + nationName + '" style="border-radius:3px; border: 1px solid;"/>');
                $('#edit_nation_' + nationId).hide();
                $('#save_edit_nation_' + nationId).show();
                $('#button_cancel_edit_nation_' + nationId).show();
            }

            $scope.cancelEditNation = function(nation) {
                console.log(nation);
                $('#edit_nation_' + nation.id).show();
                $('#save_edit_nation_' + nation.id).hide();
                $('#button_cancel_edit_nation_' + nation.id).hide();
                $('#nation_' + nation.id).html(nation.nationName);
            }

            $scope.cancelEditContact = function(contact) {
                console.log(activity);
                $scope.editInLine--;
                $scope.editContactCount--;
                if ($scope.editInLine == 0) {
                    $('#show_partner_details').removeClass('backdrop-data');
                }
                console.log($scope.editInLine);
                $('#edit_contact_' + contact.id).show();
                $('#button_cancel_edit_contact_' + contact.id).hide();
                $('#save_edit_contact_' + contact.id).hide();
                $('#contactName_' + contact.id).html(contact.contactName);
                $('#email_' + contact.id).html(contact.email);
                $('#phone_' + contact.id).html(contact.phone);
                $('#skype_' + contact.id).html(contact.skype);
                $('#about_' + contact.id).html(contact.about);
            }

            $scope.saveEditNation = function(nationId) {
                // console.log(nationId);
                var nationName = $('#nation_value_' + nationId).val();
                // console.log(v);
                $scope.request = {
                    id: nationId,
                    nationName: nationName
                }
                console.log($scope.request);
                nationService.editNation($scope.request)
                    .then(function() {
                        $('#edit_nation_' + nationId).show();
                        $('#save_edit_nation_' + nationId).hide();
                        $('#button_cancel_edit_nation_' + nationId).hide();
                        $('#nation_' + nationId).html(nationName);
                        $scope.alertSuccess('Sửa tên quốc gia thành công!', '');
                        // $scope.getAllContinent();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.editContinent = function(continentId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                var continentName = $('#continent_' + continentId).text();
                $('#continent_' + continentId).html('<input id="continent_value_' + continentId + '" value="' + continentName + '" style="border-radius:3px; border: 1px solid;"/>');
                $('#edit_continent_' + continentId).hide();
                $('#save_edit_continent_' + continentId).show();
            }

            $scope.saveEditContinent = function(continentId) {
                // console.log(nationId);
                var continentName = $('#continent_value_' + continentId).val();
                // console.log(v);
                $scope.request = {
                    id: continentId,
                    continentName: continentName
                }
                console.log($scope.request);
                nationService.editContinent($scope.request)
                    .then(function() {
                        $('#edit_continent' + continentId).show();
                        $('#save_edit_continent_' + continentId).hide();
                        $('#continent_' + continentId).html(continentName);
                        $scope.alertSuccess('Sửa tên châu lục thành công', 'success_delete_edit'); //dang vuong o cho hien alert success
                        $scope.getAllContinent();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }
        }
    ])
}());