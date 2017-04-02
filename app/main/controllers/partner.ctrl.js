(function() {
    var app = angular.module("partner", []);
    app.controller('partnerCtrl', ['$scope', 'partnerService', 'nationService', '$location', '$rootScope', '$window', '$timeout',
        function($scope, partnerService, nationService, $location, $rootScope, $window, $timeout) {
            $scope.input = [];
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
            $scope.getAllPartner = function() {
                partnerService.getAllPartner()
                    .then(function(response) {
                        // console.log(response.data);
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
                        // console.log($scope.allContinent);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.showNation = function(continent) {
                // $scope.show_nation = true;
                if (continent != "") {
                    $scope.Nations = JSON.parse(continent);
                } else {
                    $scope.Nations = null;
                }

                // console.log(JSON.parse(continent));
            }

            $scope.comfirmDelete = function(id) {
                $scope.comfirmDeleteId = id;
            }

            $scope.deletePartner = function(partnerId) {
                partnerService.deletePartner(partnerId)
                    .then(function(){
                        $scope.getAllPartner();
                        $('#close_modal_delete_partner').trigger('click');
                        $scope.alertSuccess("Xóa thành công doanh nghiệp!", "");
                    }, function(error){
                        $('#close_modal_delete_partner').trigger('click');
                        $scope.alertDanger(error.data.message, '')
                    })
            }



            $scope.createPartner = function() {
                // $('#step-1').css("display","none");

                if ($scope.input.nationId != null && $scope.input.partnerName != null) {
                    $scope.nation_ = JSON.parse($scope.input.nationId);
                    $scope.request = {
                        nationId: $scope.nation_.id,
                        partnerName: $scope.input.partnerName
                    }

                    console.log($scope.nation_);
                    partnerService.createPartner($scope.request)
                        .then(function(response) {
                            // $('#step-1').fadeTo(500, 0);
                            console.log(response);
                            $scope.editInfo = true;
                            $('#step-2').hide();
                            $('#step-2').fadeIn("slow");
                            $('#a_step_1').addClass("done");
                            $('#a_step_2').removeClass("disabled");
                            $scope.getAllPartner();
                            $scope.input.partnerName = "";
                            $scope.input.continent = null;
                            $scope.Nations = null;
                            // $("#add_partner").fadeTo(500, 0).slideUp(500, function() {
                            //     // $(this).remove();
                            // });
                            $scope.Partner = {};
                            $scope.Partner.id = response.data.id;
                            $scope.Partner.partnerInfo = {};
                            $scope.Partner.partnerInfo.partnerName = $scope.request.partnerName;
                            $scope.Partner.nation = {};

                            $scope.Partner.nation.nationName = $scope.nation_.nationName;
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger("Có lỗi xảy ra, hãy thử reload lại trang và tạo tạo lại!", '');
                        })
                }
            }

            $scope.editPartner = function(partner) {
                $scope.Partner = partner;

            }

            $scope.alert = function() {
                console.log(1);
            }

            $scope.editPartnerInfo = function() {
                console.log($scope.Partner);
                $scope.Partner.partnerInfo.partnerId = $scope.Partner.id;
                // $scope.Partner.partnerInfo.nationId = $scope.Partner.id;
                partnerService.editPartnerInfo($scope.Partner.partnerInfo)
                    .then(function(response) {
                        console.log(response);
                        $("#close_modal").trigger('click');
                        $scope.success = true;
                        if ($scope.editInfo == true){
                            $('#a_step_2').addClass("done");
                        }
                        $scope.alertSuccess('Sửa thông tin doanh nghiệp thành công!', '')
                        $scope.getAllPartner();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.close = function() {
                // alert(1)
                $("#step-2").fadeOut(500, 0).slideUp(500, function() {
                    // $(this).remove();

                    // $('#step-1').show();
                });
                $scope.editInfo = false;
                $('#a_step_1').removeClass("done");
                $('#a_step_2').removeClass("disabled").addClass("disabled");
            }

            $scope.showContact = function(partnerContacts) {
                $scope.PartnerContacts = partnerContacts;
            }

            $scope.editContact = function(contactId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                var contactName = $('#contactName_' + contactId).text();
                var email = $('#email_' + contactId).text();
                var phone = $('#phone_' + contactId).text();
                var skype = $('#skype_' + contactId).text();
                var about = $('#about_' + contactId).text();
                $('#contactName_' + contactId).html('<input id="contactName_value_' + contactId + '" value="' + contactName + '" style="border-radius:3px; border: 1px solid;"/>');
                $('#email_' + contactId).html('<input id="email_value_' + contactId + '" value="' + email + '" style="border-radius:3px; border: 1px solid;"/>');
                $('#phone_' + contactId).html('<input id="phone_value_' + contactId + '" value="' + phone + '" style="border-radius:3px; border: 1px solid;" size="9%"/>');
                $('#skype_' + contactId).html('<input id="skype_value_' + contactId + '" value="' + skype + '" style="border-radius:3px; border: 1px solid;" size="15%"/>');
                $('#about_' + contactId).html('<input id="about_value_' + contactId + '" value="' + about + '" style="border-radius:3px; border: 1px solid;"/>');
                $('#edit_contact_' + contactId).hide();
                $('#save_edit_contact_' + contactId).show();
            }

            $scope.saveEditContact = function(contactId) {
                // console.log(nationId);
                var contactName = $('#contactName_value_' + contactId).val();
                var email = $('#email_value_' + contactId).val();
                var phone = $('#phone_value_' + contactId).val();
                var skype = $('#skype_value_' + contactId).val();
                var about = $('#about_value_' + contactId).val();
                // console.log(v);
                $scope.request = {
                    id: contactId,
                    contactName: contactName,
                    email: email,
                    phone: phone,
                    skype: skype,
                    about: about
                }
                console.log($scope.request);
                partnerService.editPartnerContact($scope.request)
                    .then(function() {
                        $('#edit_contact_' + contactId).show();
                        $('#save_edit_contact_' + contactId).hide();
                        $('#contactName_' + contactId).html(contactName);
                        $('#email_' + contactId).html(email);
                        $('#phone_' + contactId).html(phone);
                        $('#skype_' + contactId).html(skype);
                        $('#about_' + contactId).html(about);
                        $scope.alertSuccess('Sửa liên hệ thành công!', 'successdelete_edit');
                        $scope.getAllPartner();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }
        }
    ])
}());
