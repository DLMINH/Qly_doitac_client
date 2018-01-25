(function() {
    var app = angular.module("partner", []);
    app.controller('partnerCtrl', ['$scope', 'partnerService', 'nationService', '$location', '$rootScope', '$window', '$timeout', 'filterFilter', '$state', '$filter',
        function($scope, partnerService, nationService, $location, $rootScope, $window, $timeout, filterFilter, $state, $filter) {
            $scope.input = {};
            $scope.partnerContact = {};
            $rootScope.currentUrl = $state.current.url;
            // $rootScope.currentUrl = $state.current.url;
            $scope.annualActivity = {};
            $scope.edit = false;
            $scope.editInLine = 0;
            $scope.editContactCount = 0;
            $scope.editContractCount = 0;
            $scope.editAnnualActivityCount = 0;

            // console.log

            // $('#show_partner_details').click(function(event) {
            //     event.stopPropagation();
            // });

            // $('#show_partner_details_modal_content').click(function(e) {
            //     // e.preventDefault();
            //     // e.stopPropagation();
            //     console.log('modal is clicked');
            // });

            $scope.$watch('selectedFindPartnerId', function() {
                // console.log($scope.selectedContract);
                // angular.forEach($rootScope.allUnit, function(c) {
                //     c.checked = false;
                // })
                // $timeout(function() {
                // $scope.$apply();
                // });
                if ($scope.selectedFindPartnerId != undefined || $scope.selectedFindPartnerId != null) {
                    $rootScope.recentCreatedPartner = undefined;
                }
            });

            window.addEventListener('click', function(e) {
                if (!$('.delete-modal').is(':visible')) {
                    if ($('#show_partner_details').is(':visible') && !$('#confirm_close_modal').is(':visible')) {
                        if (!document.getElementById('show_partner_details_modal_content').contains(e.target)) {
                            // Clicked in box
                            // console.log("out");

                            // if(check){
                            console.log(41);
                            // }
                            $scope.checkEditInline();
                            // if ($scope.editInLine == 0) {
                            //     // console.log(123234);
                            //     $('#show_partner_details').modal('hide');
                            // } else {
                            //     $('#confirm_close_modal').modal('show');
                            // }
                            // } else {
                            //     // Clicked outside the box
                            //     console.log("in");

                            // } else {
                            //     console.log(54);
                        }
                    }
                }
            });

            $scope.checkEditInline = function() {
                if ($scope.editInLine == 0) {
                    // console.log(123234);
                    $('#show_partner_details').modal('hide');
                } else {
                    $('#confirm_close_modal').modal('show');
                }
            }

            $(document).keyup(function(e) {
                // console.log($('#confirm_close_modal').is(':visible'));
                if (!$('#confirm_close_modal').is(':visible')) {
                    if (e.keyCode === 27) {
                        $scope.checkEditInline();
                        // if ($scope.editInLine == 0) {
                        //     // console.log(123234);
                        //     $('#show_partner_details').modal('hide');
                        // } else {
                        //     $('#confirm_close_modal').modal('show');
                        // }
                    }
                } // esc
            });


            $scope.paginate = function() {
                // console.log($scope.entry);
                if ($scope.entry != '') {
                    if ($scope.entry > $scope.totalItems) {
                        $scope.entryLimit = $scope.totalItems;
                    } else {
                        $scope.entryLimit = $scope.entry;
                    }
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                } else {
                    $scope.entryLimit = 25;
                    if ($scope.entryLimit > $scope.totalItems) {
                        $scope.entryLimit = $scope.totalItems;
                    }
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                }
            }

            $scope.getPartnerAndId = function() {
                partnerService.getPartnerAndId()
                    .then(function(response) {
                        // console.log(response.data);
                        $scope.allPartnerNameId = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            // $scope.getPartnerAndId();

            $scope.getAllAnnualActivity = function() {
                partnerService.getAllAnnualActivity()
                    .then(function(response) {
                        $scope.allAnnualActivity = response.data;
                        // $scope.totalItems = response.data.length;
                        // $scope.currentPage = 1;
                        // $scope.entryLimit = 25;
                        // if ($scope.entryLimit > $scope.totalItems) {
                        //     $scope.entryLimit = $scope.totalItems;
                        // }
                        // $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        // $scope.$watch('search', function(newVal, oldVal) {
                        //     $scope.filterednoFollows = filterFilter($scope.noFollows, newVal);
                        //     $scope.totalItemsnoFollows = $scope.filterednoFollows.length;
                        //     $scope.noOfPagesnoFollows = Math.ceil($scope.totalItemsnoFollows / $scope.entryLimitnoFollows);
                        //     $scope.currentPagenoFollows = 1;
                        // }, true);

                    }, function(error) {
                        console.log(error);
                    })

            }
            // $scope.annualActivity
            $scope.createAnnaulActivity = function(modalPartner) {
                //chua co partner id
                console.log($scope.annualActivity);
                if (sessionStorage['contractId']) {
                    $scope.annualActivity.contractId = sessionStorage['contractId'];
                } else {
                    $scope.annualActivity.contractId = "";
                }
                if ($scope.annualActivity.activityName != "" && $scope.annualActivity.content != "" && $scope.annualActivity.contractId != "") {
                    // $scope.annualActivity.partnerId = $scope.Partner.id;
                    $scope.annualActivity.content = $scope.annualActivity.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    // if ($scope.annualActivity.date) {
                    //     $scope.annualActivity.date = $scope.annualActivity.date.getTime();
                    // }
                    // console.log($scope.annualActivity);
                    partnerService.createAnnaulActivity($scope.annualActivity)
                        .then(function(response) {
                            if (modalPartner == true) {
                                // if ($scope.Partner.annualActivity == null) {
                                //     $scope.Partner.annualActivity = [];
                                // }
                                $scope.allAnnaulActivityOfPartner.push($scope.annualActivity);
                                $scope.alertSuccess("Thêm hoạt động thành công!", "");
                            } else if (modalPartner == undefined || modalPartner == false) {
                                $scope.alertSuccess("Thêm hoạt động thành công!", "");
                                $scope.allAnnualActivity.push(response.data);
                            }
                            $scope.annualActivity = {};
                        })
                }
                // console.log($scope.annualActivity);
            }



            $scope.confirmDeleteActivity = function(activityId) {
                $('#i_confirm_delete_activity_' + activityId).hide();
                $('#button_confirm_delete_activity_' + activityId).show();
                $('#button_delete_activity_' + activityId).show();
            }

            $scope.cancerDeleteActivity = function(activityId) {
                $('#i_confirm_delete_activity_' + activityId).show();
                $('#button_confirm_delete_activity_' + activityId).hide();
                $('#button_delete_activity_' + activityId).hide();
            }

            $scope.deleteAnnualActivity = function(activityId, modal) {
                partnerService.deleteAnnualActivity(activityId)
                    .then(function() {
                        $scope.alertSuccess("Xóa hoạt động thành công!", '');
                        $('#annualActivity_' + activityId).remove();

                        if (modal == true) {
                            $('#delete_activity_').modal('hide');
                            var index = $scope.allAnnaulActivityOfPartner.findIndex(x => x.id === activityId);
                            if (index != -1) {
                                $scope.allAnnaulActivityOfPartner.splice(index, 1);
                            }
                        } else {
                            if (modal == undefined || modal == false) {
                                $('#delete_activity').modal('hide');
                                var index = $scope.allAnnualActivity.findIndex(x => x.id === activityId);
                                if (index != -1) {
                                    $scope.allAnnualActivity.splice(index, 1);
                                }
                            }
                        }
                    })
            }

            $scope.getAllAnnualActivityOfPartner = function() {
                if ($scope.allAnnaulActivityOfPartner == undefined) {
                    partnerService.getAllAnnualActivityOfPartner($scope.Partner.id)
                        .then(function(response) {
                            // console.log(response.data);
                            $scope.allAnnaulActivityOfPartner = response.data;
                            $scope.Partner.annualActivity = response.data;
                            // console.log($scope.Partner);
                            // return response.data;
                        }, function(error) {
                            console.log(error);
                        })
                }
            }

            $scope.getAllContractOfPartner = function() {
                partnerService.getAllContractOfPartner($scope.Partner.id)
                    .then(function(response) {
                        // console.log(response);
                        $scope.allContract = response.data;
                        angular.forEach($scope.allContract, function(contract) {
                            contract.checked = false;
                            contract.contentContract = "";
                            angular.forEach(contract.cooperateActivity, function(v) {
                                contract.contentContract = contract.contentContract + v.cooperateActivity + "<br />";
                            });
                            // console.log(contract.contentContract);
                        });
                        $scope.Partner.contracts = $scope.allContract;
                    }, function(error) {
                        console.log(error);
                    })
            }

            // $scope.selectPartner = function(partner){
            //     $scope.Partner = partner;
            // }

            // $scope.clearData = function() {
            //     $rootScope.recentCreatedPartner = undefined;
            // }

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
                        console.log(response.data);
                        $rootScope.allPartner = response.data;
                        $scope.currentPage = 1;
                        $scope.totalItems = response.data.length;
                        $scope.entryLimit = 10; // items per page
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.filtered = filterFilter($rootScope.allPartner, newVal);
                            $scope.totalItems = $scope.filtered.length;
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.currentPage = 1;
                        }, true);
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
                // console.log(continent);
                if (continent != "") {
                    $scope.Nations = JSON.parse(continent);
                } else {
                    $scope.Nations = null;
                }

                // console.log(JSON.parse(continent));
            }

            // $scope.confirmDelete = function(id, name) {
            //     console.log(id)
            //     $scope.confirmDeleteId = id;
            //     $scope.confirmDeleteName = name;
            // }

            $scope.deletePartner = function(partnerId) {
                partnerService.deletePartner(partnerId)
                    .then(function() {
                        $scope.getAllPartner();
                        $('#close_modal_delete_partner').trigger('click');
                        $scope.alertSuccess("Xóa thành công doanh nghiệp!", "");
                    }, function(error) {
                        $('#close_modal_delete_partner').trigger('click');
                        $scope.alertDanger(error.data.message, '')
                    })
            }

            $scope.deletePartnerContact = function(contactId) {
                partnerService.deletePartnerContact(contactId)
                    .then(function() {
                        $('#tr_contact_' + contactId).remove();
                        $('#close_modal_delete_partner_contact').trigger('click');
                        $scope.alertSuccess("Xóa liên hệ thành công!", "successdelete_edit");
                        // $scope.getAllPartner();
                        var index = $rootScope.allPartner.findIndex(x => x.id === $scope.Partner.id);
                        index = $rootScope.allPartner[index].partnerContacts.findIndex(x => x.id === contactId);
                        $rootScope.allPartner[index].partnerContacts.splice(index, 1);
                        // console.log(index);
                    }, function(error) {
                        $('#close_modal_delete_partner_contact').trigger('click');
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.createPartner = function() {
                if ($scope.input.nationId != null && $scope.input.partnerName != null) {
                    var nation = $scope.input.nationId;
                    nation = JSON.parse(nation);
                    $scope.input.nationId = nation.id;
                    // $scope.request = {
                    //     nationId: $scope.nation_.id,
                    //     partnerName: $scope.input.partnerName
                    // }

                    if ($scope.input.birthday) {
                        $scope.input.birthday = $scope.input.birthday.getTime();
                    }
                    console.log($scope.input);
                    partnerService.createPartner($scope.input)
                        .then(function(response) {
                            $scope.alertSuccess("Tạo đối tác thành công", "");
                            console.log(response.data);
                            $rootScope.allPartner.push(response.data);
                            // $scope.$broadcast('angucomplete-alt:clearInput', 'findpartnerId');
                            // var originalObject = {
                            //     originalObject: response.data
                            // }
                            $rootScope.recentCreatedPartner = response.data;
                            console.log($rootScope.recentCreatedPartner);
                            $timeout(function() {
                                $scope.$apply();
                            });
                            $scope.input = {};

                            // if($scope)

                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger("Có lỗi xảy ra, hãy thử reload lại trang và tạo lại!", '');
                        })
                }
            }

            $scope.addContact = function() {
                $scope.editInfo = false;
                $scope.addPartnerContact = true;
                // $('#step-3').hide();
                // $('#step-3').fadeIn("slow");
                $('#a_step_2').addClass("done");
                $('#a_step_3').removeClass("disabled");
            }

            $scope.createPartnerContact = function(location, partnerId) {
                console.log(location);
                console.log($scope.partnerContact);
                if (location == undefined) {
                    location = "";
                }
                if (location != 'contract') {
                    if ($scope.input.partnerContact.partnerId != null && $scope.input.partnerContact.contactName != null) {
                        // console.log($scope.input.partnerContact);
                        partnerService.createPartnerContact($scope.input.partnerContact, $scope.input.partnerContact.partnerId)
                            .then(function(response) {
                                // $scope.getAllPartner();
                                // var index = $rootScope.allPartner.findIndex(x => x.id === $scope.input.partnerContact.partnerId);
                                angular.forEach($rootScope.allPartner, function(partner) {
                                    if (partner.id == $scope.input.partnerContact.partnerId) {
                                        if (partner.partnerContacts == null) {
                                            partner.partnerContacts = [];
                                        }
                                        partner.partnerContacts.push(response.data);
                                    }
                                })
                                // console.log(index);
                                // console.log($scope.input.partnerContact.partnerId);
                                // if($rootScope.allPartner[index].partnerContacts == null){
                                //     $rootScope.allPartner[index].partnerContacts = [];
                                // }
                                // $rootScope.allPartner[index].partnerContacts.push($scope.input.partnerContact);
                                $scope.input.partnerContact = {};
                                $scope.alertSuccess("Tạo liên hệ thành công", '');
                            }, function(error) {
                                $scope.alertDanger(error.data.message, '');
                            })
                    }
                } else {
                    if ($scope.partnerContact != null || $scope.partnerContact != undefined) {
                        if ($scope.partnerContact.contactName != null || $scope.partnerContact.contactName != undefined) {
                            partnerService.createPartnerContact($scope.partnerContact, partnerId)
                                .then(function(response) {
                                    // $scope.getAllPartner();
                                    // var index = $rootScope.allPartner.findIndex(x => x.id === $scope.input.partnerContact.partnerId);
                                    angular.forEach($rootScope.allPartner, function(partner) {
                                        if (partner.id == partnerId) {
                                            if (partner.partnerContacts == null) {
                                                partner.partnerContacts = [];
                                            }
                                            partner.partnerContacts.push(response.data);
                                            // break;
                                        }
                                    })
                                    // console.log(index);
                                    // console.log($scope.input.partnerContact.partnerId);
                                    // if($rootScope.allPartner[index].partnerContacts == null){
                                    //     $rootScope.allPartner[index].partnerContacts = [];
                                    // }
                                    // $rootScope.allPartner[index].partnerContacts.push($scope.input.partnerContact);
                                    $scope.partnerContact = {};
                                    // $rootScope.selectedFindPartnerId.originalObject.pa
                                    // if ($rootScope.selectedFindPartnerId.originalObject.partnerContacts == null) {
                                    //     $rootScope.selectedFindPartnerId.originalObject.partnerContacts = [];
                                    // }
                                    // $rootScope.selectedFindPartnerId.originalObject.partnerContacts.push(response.data);
                                    $scope.alertSuccess("Tạo liên hệ thành công", '');
                                }, function(error) {
                                    $scope.alertDanger(error.data.message, '');
                                })
                        }
                    }
                }

            }

            $scope.click = function(id) {
                $timeout(function() {
                    $('#' + id).trigger('click');

                    // console.log(id);
                    // console.log($scope.Partner);
                });
            }

            $scope.getAllAnnualActivityOfContract = function(contractId) {
                partnerService.getAllAnnualActivityOfContract(contractId)
                    .then(function(response) {
                        console.log(response.data);
                        $scope.Partner.annualActivity = response.data;
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.editPartner = function(partner, flag, contract) {
                console.log(contract);
                $scope.Partner = partner;
                if ($scope.Partner.birthday != null) {
                    $scope.Partner.birthday = new Date($scope.Partner.birthday)
                }
                $scope.edit = flag;
                $scope.showContact();
                $scope.getAllAnnualActivityOfContract(contract.id);
                // $scope.getAllAnnualActivityOfPartner();
                // $scope.getAllContractOfPartner();
                // $scope.Partner.annualActivity  = $scope.getAllAnnualActivityOfPartner();
                // console.log($scope.getAllAnnualActivityOfPartner());
            }

            $scope.alert = function() {
                console.log(1);
            }

            $scope.editPartnerInfo = function(modal) {
                console.log($scope.Partner);
                $scope.Partner.partnerId = $scope.Partner.id;
                // $scope.Partner.partnerInfo.nationId = $scope.Partner.id;
                partnerService.editPartnerInfo($scope.Partner)
                    .then(function(response) {
                        console.log(response);
                        if (modal == false) {
                            $("#close_modal").trigger('click');
                            $scope.success = true;
                            if ($scope.editInfo == true) {
                                $('#a_step_2').addClass("done");
                            }
                            $scope.alertSuccess('Sửa thông tin doanh nghiệp thành công!', '');
                            $scope.getAllPartner();
                        } else if (modal == true) {
                            $scope.alertSuccess('Sửa thông tin doanh nghiệp thành công!', 'successdelete_edit');

                        }
                        $scope.Partner = response.data;
                        var index = $rootScope.allPartner.findIndex(x => x.id === response.data.id);
                        $rootScope.allPartner[index] = response.data;
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.closeModal = function(id) {
                console.log(id);
                // angular.forEach(id, function(e){
                //     console.log(e);
                //     $('#' + e).modal('hide');

                // })
                // $timeout(function() {
                //     $('#' + id).modal('hide');
                // });
                // if (id != 'show_partner_details') {
                $('#' + id).modal('hide');
                if (id == 'show_partner_details') {
                    $scope.editInLine = 0;
                    $scope.editContactCount = 0;
                    $scope.editContractCount = 0;
                    $scope.editAnnualActivityCount = 0;
                    $scope.Partner = undefined;
                    // $('.modal-backdrop').remove();
                }
                // }
            }

            $scope.close = function() {
                // alert(1)
                $("#step-2").fadeOut("slow", function() {

                    $('#a_step_1').removeClass("done");
                    $('#a_step_2').removeClass("done").addClass("disabled");
                });
                $scope.editInfo = false;

            }

            $scope.showContact = function(partnerContacts) {
                console.log(partnerContacts);
                $scope.PartnerContacts = partnerContacts;
            }

            $scope.editAnnualActivity = function(annualActivityId, c) {
                console.log($scope.editInLine);
                console.log($state.current);
                if ($state.current.url == '/information') {
                    $scope.editInLine++;
                    $scope.editAnnualActivityCount++;
                    if ($scope.editInLine == 1) {
                        console.log(119);
                        // console.log($('#show_partner_details').data('bs.modal'));
                        $('#show_partner_details').data('bs.modal').options.keyboard = false;
                        $('#show_partner_details').data('bs.modal').options.backdrop = 'static';
                        // $('#show_partner_details').modal({ // dung cai nay khi ma click
                        //     backdrop: 'static',
                        //     keyboard: false
                        // })
                    }
                }

                var content = c.replace(/<br\s*[\/]?>/g, '\r\n');
                $('#content_' + annualActivityId).html('<textarea class="form-control" rows"15" id="content_value_' + annualActivityId + '" style="border-radius:3px; border: 1px solid; height: 150px;">' + content + '</textarea>');


                var activityName = $('#activityName_' + annualActivityId).text();
                $('#activityName_' + annualActivityId).html('<input  id="activityName_value_' + annualActivityId + '" value="' + activityName + '" style="border-radius:3px; border: 1px solid;"/>');
                // $('#activityName_' + annualActivityId).css('width', '50%'); 

                // var date = $('#date_' + annualActivityId).text();
                // console.log(date);
                // if (date != "") {
                //     date = date.split("/");
                //     if (date[1].length == 1) {
                //         date[1] = '0' + date[1];
                //     }
                //     if (date[0].length == 1) {
                //         date[0] = '0' + date[0];
                //     }
                //     date = date[2] + "-" + date[1] + "-" + date[0];
                // }

                // var curr_date = date.getDate();
                // var curr_month = date.getMonth() + 1; //Months are zero based
                // var curr_year = date.getFullYear();
                // date = curr_year + "-" + curr_month + "-" + curr_date;
                // date = date.split("/");
                // date = $filter("date")(date, 'yyyy-MM-dd');
                // $('#date_' + annualActivityId).html('<input type="date" id="date_value_' + annualActivityId + '" value="' + date + '" style="border-radius:3px; border: 1px solid;"/>');


                var date = $('#date_' + annualActivityId).text();
                $('#date_' + annualActivityId).html('<input  id="date_value_' + annualActivityId + '" value="' + date + '" style="border-radius:3px; border: 1px solid;"/>');

                $('#edit_activity_' + annualActivityId).hide();
                $('#save_edit_activity_' + annualActivityId).show();
                $('#button_cancel_edit_activity_' + annualActivityId).show();
            }

            $scope.saveEditAnnualActivity = function(annualActivityId) {
                var content = $('#content_value_' + annualActivityId).val().replace(/(?:\r\n|\r|\n)/g, '<br />');
                var activityName = $('#activityName_value_' + annualActivityId).val();
                // if ($('#date_value_' + annualActivityId).val() != "") {
                //     var date = new Date($('#date_value_' + annualActivityId).val()).getTime();
                // } else {
                //     date = "";
                // }
                var date = $('#date_value_' + annualActivityId).val();
                // console.log(v);
                $scope.request = {
                    content: content,
                    activityName: activityName,
                    date: date,
                    // funding: funding,
                    id: annualActivityId
                }
                console.log($scope.request);
                partnerService.editAnnualActivity($scope.request)
                    .then(function() {
                        $('#edit_activity_' + annualActivityId).show();
                        $('#save_edit_activity_' + annualActivityId).hide();
                        $('#button_cancel_edit_activity_' + annualActivityId).hide();
                        $('#content_' + annualActivityId).html(content);
                        $('#activityName_' + annualActivityId).html(activityName);
                        // if (date != "") {
                        //     date = new Date(date);
                        //     var curr_date = date.getDate();
                        //     var curr_month = date.getMonth() + 1; //Months are zero based
                        //     var curr_year = date.getFullYear();
                        //     date = curr_date + "/" + curr_month + "/" + curr_year;
                        // }
                        // $('#date_' + annualActivityId).html(date);
                        $('#date_' + annualActivityId).html(date);
                        $scope.alertSuccess('Sửa hoạt động thành công!', '');
                        if ($state.current.url == '/information') {
                            $scope.editInLine--;
                            $scope.editAnnualActivityCount--;
                            if ($scope.editInLine == 0) {
                                $('#show_partner_details').removeClass('backdrop-data');
                            }
                        }
                        // $scope.getAllContinent();
                        // $scope.Partner.annualActivity
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.cancelEditActivity = function(activityId, activity) {
                console.log(activity);
                if ($state.current.url == '/information') {
                    $scope.editInLine--;
                    $scope.editAnnualActivityCount--;
                    if ($scope.editInLine == 0) {
                        $('#show_partner_details').removeClass('backdrop-data');
                    }
                }
                console.log($scope.editInLine);
                $('#edit_activity_' + activityId).show();
                $('#button_cancel_edit_activity_' + activityId).hide();
                $('#save_edit_activity_' + activityId).hide();
                $('#content_' + activityId).html(activity.content);
                $('#activityName_' + activityId).html(activity.activityName);
                // date = new Date(activity.date);
                // var curr_date = date.getDate();
                // var curr_month = date.getMonth() + 1; //Months are zero based
                // var curr_year = date.getFullYear();
                // date = curr_date + "/" + curr_month + "/" + curr_year;
                // $('#date_' + activityId).html(date);
                $('#date_' + activityId).html(activity.date);
            }

            $scope.editContact = function(contactId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                $scope.editInLine++;
                $scope.editContactCount++;
                if ($scope.editInLine == 1) {
                    console.log(639);
                    // console.log($('#show_partner_details').data('bs.modal'));
                    $('#show_partner_details').data('bs.modal').options.keyboard = false;
                    $('#show_partner_details').data('bs.modal').options.backdrop = 'static';
                    // $('#show_partner_details').modal({ // dung cai nay khi ma click
                    //     backdrop: 'static',
                    //     keyboard: false
                    // })
                }
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
                $('#button_cancel_edit_contact_' + contactId).show();
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
                        $('#button_cancel_edit_contact_' + contactId).hide();
                        $('#contactName_' + contactId).html(contactName);
                        $('#email_' + contactId).html(email);
                        $('#phone_' + contactId).html(phone);
                        $('#skype_' + contactId).html(skype);
                        $('#about_' + contactId).html(about);
                        $scope.alertSuccess('Sửa liên hệ thành công!', 'successdelete_edit');
                        // $scope.getAllPartner();
                        $scope.editInLine--;
                        $scope.editContactCount--;
                        if ($scope.editInLine == 0) {
                            $('#show_partner_details').removeClass('backdrop-data');
                        }
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }
        }
    ])
}());