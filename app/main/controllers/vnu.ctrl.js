(function() {
    var app = angular.module("vnu", []);
    app.controller('vnuCtrl', ['$scope', 'vnuService', '$location', '$rootScope', '$window', '$timeout', 'partnerService', 'filterFilter', 'md5', '$state', '$sce',
        function($scope, vnuService, $location, $rootScope, $window, $timeout, partnerService, filterFilter, md5, $state, $sce) {
            $rootScope.currentUrl = $state.current.url;

            $scope.shareContract = function() {
                $scope.request = [];
                angular.forEach($scope.allUnit, function(unit) {
                    if (unit.checked == true) {
                        angular.forEach($scope.allContract, function(contract) {
                            if (contract.checked == true) {
                                $scope.request.push({
                                    unitNameId: unit.id,
                                    id: contract.id
                                })
                            }
                        });
                    }
                })
                console.log($scope.request);
                vnuService.shareContract($scope.request)
                    .then(function(){
                        $scope.alertSuccess("Thành công!", "successdelete_edit");
                        angular.forEach($scope.allUnit, function(unit) {
                            if (unit.checked == true) {
                                unit.checked = false;
                            }
                        })
                    }, function(error){
                        console.log(error);
                    })
            }

            $scope.exportData = function() {
                // $scope.exportDataExcel = $scope.allContract;
                var count = 0;
                // console.log($scope.exportDataExcel);
                // alasql('SELECT * INTO XLSX("xlsx.xlsx",{headers:true}) FROM ?', [$scope.exportDataExcel]);
                var wb = {};
                wb.Sheets = {};
                wb.SheetNames = [];
                /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
                var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                var wscols = [];
                wscols[0] = { wpx: 250 };
                wscols[1] = { wpx: 120 };
                wscols[2] = { wpx: 250 };
                wscols[3] = { wpx: 200 };
                wscols[7] = { wpx: 200 };
                wscols[8] = { wpx: 200 };
                var ws = { '!ref': "A1:J220" };
                ws['!cols'] = wscols;
                // ws['A1'] = { h: "test", r: "<t>test</t>", t: "s", v: "test", w: "test" }
                var i = 2;
                ws['A1'] = {
                    h: "Tên cơ quan hợp tác",
                    r: "Tên cơ quan hợp tác",
                    t: "s",
                    v: "Tên cơ quan hợp tác",
                    w: "Tên cơ quan hợp tác"
                };
                ws['B1'] = {
                    h: "Quốc gia",
                    r: "Quốc gia",
                    t: "s",
                    v: "Quốc gia",
                    w: "Quốc gia"
                };
                ws['C1'] = {
                    h: "Người ký (VNU-UET)",
                    r: "Người ký (VNU-UET)",
                    t: "s",
                    v: "Người ký (VNU-UET)",
                    w: "Người ký (VNU-UET)"
                };
                ws['D1'] = {
                    h: "Nội dung hợp tác chính",
                    r: "Nội dung hợp tác chính",
                    t: "s",
                    v: "Nội dung hợp tác chính",
                    w: "Nội dung hợp tác chính"
                };
                ws['E1'] = {
                    h: "Kinh phí",
                    r: "Kinh phí",
                    t: "s",
                    v: "Kinh phí",
                    w: "Kinh phí"
                };
                ws['F1'] = {
                    h: "Ngày ký",
                    r: "Ngày ký",
                    t: "s",
                    v: "Ngày ký",
                    w: "Ngày ký"
                };
                ws['G1'] = {
                    h: "Ngày hết hiệu lực",
                    r: "Ngày hết hiệu lực",
                    t: "s",
                    v: "Ngày hết hiệu lực",
                    w: "Ngày hết hiệu lực"
                };
                ws['H1'] = {
                    h: "Đơn vị theo dõi",
                    r: "Đơn vị theo dõi",
                    t: "s",
                    v: "Đơn vị theo dõi",
                    w: "Đơn vị theo dõi"
                };
                ws['I1'] = {
                    h: "Hiệu quả hợp tác",
                    r: "Hiệu quả hợp tác",
                    t: "s",
                    v: "Hiệu quả hợp tác",
                    w: "Hiệu quả hợp tác"
                };
                ws['J1'] = {
                    h: "Lưu ý",
                    r: "Lưu ý",
                    t: "s",
                    v: "Lưu ý",
                    w: "Lưu ý",
                };
                angular.forEach($scope.allContract, function(excel) {
                    if (excel.checked == true) {
                        var startDate = new Date(excel.startDate);
                        var curr_date = startDate.getDate();
                        var curr_month = startDate.getMonth() + 1; //Months are zero based
                        var curr_year = startDate.getFullYear();
                        startDate = curr_date + "-" + curr_month + "-" + curr_year;
                        var endDate = new Date(excel.endDate);
                        var curr_date = endDate.getDate();
                        var curr_month = endDate.getMonth() + 1; //Months are zero based
                        var curr_year = endDate.getFullYear();
                        endDate = curr_date + "-" + curr_month + "-" + curr_year;
                        ws['A' + i] = {
                            h: excel.partner.partnerName,
                            r: excel.partner.partnerName,
                            t: "s",
                            v: excel.partner.partnerName,
                            w: excel.partner.partnerName,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['B' + i] = {
                            h: excel.partner.nation.nationName,
                            r: excel.partner.nation.nationName,
                            t: "s",
                            v: excel.partner.nation.nationName,
                            w: excel.partner.nation.nationName,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['C' + i] = {
                            h: excel.uetMan.uetManName,
                            r: excel.uetMan.uetManName,
                            t: "s",
                            v: excel.uetMan.uetManName,
                            w: excel.uetMan.uetManName,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['D' + i] = {
                            h: excel.contentContract.replace(/<br\s*[\/]?>/g, '\r\n'),
                            r: excel.contentContract.replace(/<br\s*[\/]?>/g, '\r\n'),
                            t: "s",
                            v: excel.contentContract.replace(/<br\s*[\/]?>/g, '\r\n'),
                            w: excel.contentContract.replace(/<br\s*[\/]?>/g, '\r\n'),
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['E' + i] = {
                            h: excel.funding,
                            r: excel.funding,
                            t: "s",
                            v: excel.funding,
                            w: excel.funding,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['F' + i] = {
                            h: startDate,
                            r: startDate,
                            t: "s",
                            v: startDate,
                            w: startDate,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['G' + i] = {
                            h: endDate,
                            r: endDate,
                            t: "s",
                            v: endDate,
                            w: endDate,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        ws['H' + i] = {
                            h: excel.unitName.unitName,
                            r: excel.unitName.unitName,
                            t: "s",
                            v: excel.unitName.unitName,
                            w: excel.unitName.unitName,
                            s: {
                                alignment: {
                                    wrapText: true,
                                    vertical: "center"
                                }
                            }
                        };
                        if (excel.result != null) {
                            ws['I' + i] = {
                                h: excel.result,
                                r: excel.result,
                                t: "s",
                                v: excel.result,
                                w: excel.result,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center",
                                        horizontal: "center"
                                    }
                                }
                            };
                        }
                        if (excel.notice != null) {

                            ws['J' + i] = {
                                h: excel.notice,
                                r: excel.notice,
                                t: "s",
                                v: excel.notice,
                                w: excel.notice,
                                s: {
                                    alignment: {
                                        wrapText: true,
                                        vertical: "center",
                                        horizontal: "center"
                                    }
                                }
                            };
                        }
                        i++;
                        count++;
                        // console.log(excel);
                    }

                });
                wb.SheetNames.push('Hop Dong');
                wb.Sheets['Hop Dong'] = ws;

                var wbout = XLSX.write(wb, wopts);

                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
                if (count == 0) {
                    $scope.alertWarning("Chưa có hợp đồng nào được chọn!", 5000);
                } else {
                    saveAs(new Blob([s2ab(wbout)], { type: "" }), "Danh muc hop tac.xlsx");
                    $scope.alertSuccess("Xuất hợp đồng ra file excel thành công!", "");
                }
            };


            // create contract from excel
            $scope.convert = function() {
                var xlf = document.getElementById('xlf');

                function handleFile(e) {
                    var files = e.target.files;
                    var i, f;
                    for (i = 0, f = files[i]; i != files.length; ++i) {
                        var reader = new FileReader();
                        var name = f.name;
                        reader.onload = function(e) {
                            var data = e.target.result;

                            var workbook = XLSX.read(data, { type: 'binary' });

                            var first_sheet_name = workbook.SheetNames[0];
                            /* DO SOMETHING WITH workbook HERE */
                            var worksheet = workbook.Sheets[first_sheet_name];
                            worksheet['B1'].w = "partnerName";
                            worksheet['C1'].w = "nation";
                            worksheet['E1'].w = "startDate";
                            worksheet['F1'].w = "contactName";
                            worksheet['G1'].w = "uetMan";
                            worksheet['H1'].w = "contentContract";
                            worksheet['I1'].w = "funding";
                            worksheet['J1'].w = "endDate";
                            worksheet['K1'].w = "renew";
                            worksheet['L1'].w = "unitName";
                            worksheet['M1'].w = "result";
                            worksheet['N1'].w = "notice";
                            $rootScope.excel = XLSX.utils.sheet_to_json(worksheet);
                        };
                        reader.readAsBinaryString(f);
                    }
                }
                if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

                // input_dom_element.addEventListener('change', handleFile, false);
            }

            $scope.convertIn = function() {
                var xlfIn = document.getElementById('xlfIn');

                function handleFile(e) {
                    var files = e.target.files;
                    var i, f;
                    for (i = 0, f = files[i]; i != files.length; ++i) {
                        var reader = new FileReader();
                        var name = f.name;
                        reader.onload = function(e) {
                            var data = e.target.result;

                            var workbook = XLSX.read(data, { type: 'binary' });

                            var first_sheet_name = workbook.SheetNames[0];
                            /* DO SOMETHING WITH workbook HERE */
                            var worksheet = workbook.Sheets[first_sheet_name];
                            worksheet['B1'].w = "partnerName";
                            worksheet['C1'].w = "startDate";
                            worksheet['D1'].w = "uetMan";
                            worksheet['E1'].w = "contactName";
                            worksheet['F1'].w = "contentContract";
                            worksheet['G1'].w = "endDate";
                            worksheet['H1'].w = "funding";
                            worksheet['I1'].w = "renew";
                            worksheet['J1'].w = "unitName";
                            $rootScope.excelIn = XLSX.utils.sheet_to_json(worksheet);
                        };
                        reader.readAsBinaryString(f);
                    }
                }
                if (xlfIn.addEventListener) xlfIn.addEventListener('change', handleFile, false);

                // input_dom_element.addEventListener('change', handleFile, false);
            }

            $scope.setExcelTable = function() {
                // alert(1);

                // console.log($rootScope.excel);
                $scope.checkContractValue = true;
                $scope.excelTable = $rootScope.excel;
                // console.log($scope.excelTable);
                angular.forEach($scope.excelTable, function(v) {
                    // v.endDate = v.endDate.getTime();
                    v.contentContract = v.contentContract.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    // console.log(v.contentContract);
                    v.endDate = new Date(v.endDate).getTime();
                    v.startDate = new Date(v.startDate).getTime();
                    vnuService.checkContract(v)
                        .then(function(response) {
                            console.log(response.data);
                            if (response.data.contactName == "nf") {
                                $('#contactName_' + v.STT).css('background-color', '#f0ad4e');
                                $scope.checkContractValue = false;
                            } else {
                                v.partnerContactId = response.data.contactName;
                            }
                            if (response.data.partnerName == "nf") {
                                $('#partnerName_' + v.STT).css('background-color', '#f0ad4e');
                                $scope.checkContractValue = false;
                            } else {
                                v.partnerId = response.data.partnerName;
                            }
                            if (response.data.uetMan == "nf") {
                                $('#uetMan_' + v.STT).css('background-color', '#f0ad4e');
                                $scope.checkContractValue = false;
                                $('#p_uetMan_' + v.STT).after('<button id="button_uetMan_' + v.STT + '">Tạo</button>');
                                $('#button_uetMan_' + v.STT).hide();
                            } else {
                                v.uetManId = response.data.uetMan;
                            }
                            if (response.data.unitName == "nf") {
                                if ($rootScope.role == "UNIT") {
                                    v.unitNameId = $rootScope.id;
                                } else {
                                    $('#unitName_' + v.STT).css('background-color', '#f0ad4e');
                                    $scope.checkContractValue = false;
                                }
                            } else {
                                if ($rootScope.role == "UNIT") {
                                    v.unitNameId = $rootScope.id;
                                } else {
                                    v.unitNameId = response.data.unitName;
                                }

                            }
                            v.typeContractId = 1;
                        }, function(error) {
                            console.log(error);
                        })
                });
            }

            $scope.setExcelTableIn = function() {
                // alert(1);
                // console.log($rootScope.excelIn);
                $scope.checkContractValue = true;
                $scope.excelTableIn = $rootScope.excelIn;
                angular.forEach($scope.excelTableIn, function(v) {
                    // v.endDate = v.endDate.getTime();
                    v.contentContract = v.contentContract.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    // console.log(v.contentContract);
                    v.endDate = new Date(v.endDate).getTime();
                    v.startDate = new Date(v.startDate).getTime();
                    vnuService.checkContract(v)
                        .then(function(response) {
                            // console.log(response.data);
                            if (response.data.contactName == "nf") {
                                $('#In_contactName_' + v.STT).css('background-color', '#f0ad4e');
                                $scope.checkContractValue = false;
                            } else {
                                v.partnerContactId = response.data.contactName;
                            }
                            if (response.data.partnerName == "nf") {
                                $('#In_partnerName_' + v.STT).css('background-color', '#f0ad4e');
                                $scope.checkContractValue = false;
                            } else {
                                v.partnerId = response.data.partnerName;
                            }
                            if (response.data.uetMan == "nf") {
                                $('#In_uetMan_' + v.STT).css('background-color', '#f0ad4e');
                                $scope.checkContractValue = false;
                                $('#In_p_uetMan_' + v.STT).after('<button id="In_button_uetMan_' + v.STT + '">Tạo</button>');
                                $('#In_button_uetMan_' + v.STT).hide();
                            } else {
                                v.uetManId = response.data.uetMan;
                            }
                            if (response.data.unitName == "nf") {
                                if ($rootScope.role == "UNIT") {
                                    v.unitNameId = $rootScope.id;
                                } else {
                                    $('#unitName_' + v.STT).css('background-color', '#f0ad4e');
                                    $scope.checkContractValue = false;
                                }
                            } else {
                                if ($rootScope.role == "UNIT") {
                                    v.unitNameId = $rootScope.id;
                                } else {
                                    v.unitNameId = response.data.unitName;
                                }

                            }
                            v.typeContractId = 1;
                        }, function(error) {
                            console.log(error);
                        })
                });
            }

            $scope.showButton = function(STT) {
                $('#p_uetMan_' + STT).hide();
                $('#button_uetMan_' + STT).show();
            }

            $scope.hideButton = function(STT) {
                // alert(1);
                $('#button_uetMan_' + STT).hide();
                $('#p_uetMan_' + STT).show();
            }

            $scope.importExcel = function() {
                if ($scope.excelTable != null) {
                    vnuService.importExcel($scope.excelTable)
                        .then(function(response) {
                            // console.log(response.data);
                            $('#close_insert_excel').trigger('click');
                            $scope.alertSuccess("Thêm hợp đồng từ excel thành công!", "");
                            $scope.getAllContract();
                        }, function(error) {
                            console.log(error);
                        })
                }
                if ($scope.excelTableIn != null) {
                    // console.log($scope.excelTableIn);
                    vnuService.importExcel($scope.excelTableIn)
                        .then(function(response) {
                            console.log(response.data);
                            if (angular.equals(response.data, [])) {
                                $('#close_insert_excel_in').trigger('click');
                                $scope.alertSuccess("Thêm hợp đồng từ excel thành công!", "");
                                $scope.getAllContract();
                            } else {
                                $scope.alertWarning("Còn 1 số hợp đồng chưa được nhập vào cơ sở dữ liệu, hãy kiểm tra lại!", 10000);
                                $scope.excelTableIn = response.data;
                            }

                        }, function(error) {
                            console.log(error);
                        })
                }

            }

            $scope.createAccount = function() {
                if ($scope.input.userName != "" && $scope.input.password != "") {
                    $scope.request = {
                        userName: $scope.input.userName,
                        password: md5.createHash($scope.input.password || '')
                    }
                    console.log($scope.request);
                    console.log($scope.input.unitNameId);
                    vnuService.createAccount($scope.request, $scope.input.unitNameId)
                        .then(function() {
                            $scope.alertSuccess("Tạo tài khoản thành công!", "");
                            $scope.input.userName = "";
                            $scope.input.password = "";
                            $scope.getAllUnitName();
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, "");
                        })
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
                            $scope.alertDanger(error.data.message, "");
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
                        // console.log(response);
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
                        // console.log(response);
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

            $scope.getAllContractOfPartner = function() {
                vnuService.getAllContractOfPartner($scope.Partner.id)
                    .then(function(response) {
                        console.log(response);
                        $scope.allContract = response.data;
                        angular.forEach($scope.allContract, function(contract) {
                            contract.checked = false;
                            contract.contentContract = "";
                            angular.forEach(contract.cooperateActivity, function(v) {
                                contract.contentContract = contract.contentContract + v.cooperateActivity + "<br />";
                            });
                            // console.log(contract.contentContract);
                        });
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.getAllContract = function() {
                vnuService.getAllContract()
                    .then(function(response) {
                        console.log(response.data);
                        $scope.allContract = response.data;
                        angular.forEach($scope.allContract, function(contract) {
                            contract.checked = false;
                            contract.contentContract = "";
                            angular.forEach(contract.cooperateActivity, function(v) {
                                contract.contentContract = contract.contentContract + v.cooperateActivity + "<br />";
                            });
                            // console.log(contract.contentContract);
                        });
                        $scope.currentPage = 1;
                        $scope.totalItems = response.data.length;
                        $scope.entryLimit = 10; // items per page
                        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                        $scope.$watch('search', function(newVal, oldVal) {
                            $scope.filtered = filterFilter($scope.allContract, newVal);
                            $scope.totalItems = $scope.filtered.length;
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                            $scope.currentPage = 1;
                        }, true);
                        // console.log(response);
                    }, function(error) {
                        console.log(error);
                    })
            }

            $scope.addAttachFileToScope = function(fileName, fileType, attachFile, elementId) {
                console.log(706)
                if (elementId == 'contract-edit') {
                    $scope.editContractData.fileName = fileName;
                    $scope.editContractData.fileType = fileType;
                    $scope.editContractData.attachFile = attachFile;
                    $scope.editContractData.attachFileAdd = 'edited';
                } else if (elementId == 'contract-create') {
                    $scope.input.fileName = fileName;
                    $scope.input.fileType = fileType;
                    $scope.input.attachFile = attachFile;
                } else if (elementId.indexOf("contract-excel-")) {
                    // console.log($(".attach-file").attr('id').split("-").pop());
                }
            }

            var handleFileSelect = function(evt) {
                var file = evt.currentTarget.files[0];
                console.log(evt.currentTarget.files);
                var id = evt.target.id;
                var fileName = evt.currentTarget.files[0].name;
                var fileType = evt.currentTarget.files[0].name.split('.').pop();
                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        var attachFile = evt.target.result.split(',').pop();
                        $scope.addAttachFileToScope(fileName, fileType, attachFile, id);
                    });
                };

                // if($(".attach-file").attr('id') == 'attach-file-modal'){
                //     $scope.editContractData.fileName = 
                // }
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#contract-create')).on('change', handleFileSelect);
            // hiện tại, class nhưng chỉ nhận 1 input
            $scope.getLinkFile = function(attachFileAdd) {
                // attachFileAdd = "http://www.pdf995.com/samples/pdf.pdf";
                $rootScope.modalFileLink = $sce.trustAs($sce.RESOURCE_URL, "https://docs.google.com/gview?url=" + $rootScope.clientAdd + attachFileAdd + "&embedded=true");
            }

            $scope.createContract = function() {
                if ($scope.Partner != undefined) {
                    $scope.input.partnerId = $scope.Partner.id;
                    var Partner = true;
                }
                if ($rootScope.role == 'UNIT') {
                    $scope.input.unitNameId = $rootScope.id;
                }
                if (($scope.input.partnerId + $scope.input.partnerContactId + $scope.input.unitNameId + $scope.input.uetManId + $scope.input.typeContractId + $scope.input.contentContract + $scope.input.funding) != "") {
                    if ($scope.input.startDate) {
                        $scope.input.startDate = $scope.input.startDate.getTime();
                    }
                    if ($scope.input.endDate) {
                        $scope.input.endDate = $scope.input.endDate.getTime();
                    }
                    console.log($scope.input);
                    $scope.input.contentContract = $scope.input.contentContract.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    vnuService.createContract($scope.input)
                        .then(function() {
                            // 
                            $scope.alertSuccess("Tạo hợp đồng thành công!", "");
                            $scope.input = [];
                            if (Partner != undefined) {
                                $scope.getAllContractOfPartner();
                            } else {
                                $("#close_modal_create").trigger('click');
                                $scope.getAllContract();
                            }

                        }, function(error) {
                            console.log(error);
                        })
                }
            }

            $scope.setEditContract = function(contract) {
                $scope.editContractData = contract;
                console.log(contract);
                // $scope.editContractData.startDate = null;
                if ($scope.editContractData.startDate != null) {
                    $scope.editContractData.startDate = new Date($scope.editContractData.startDate)
                }
                // var curr_date = $scope.editContractData.startDate.getDate();
                // // console.log(curr_date.length());
                // if (curr_date.length == 1) {
                //     curr_date = '0' + curr_date;
                // }
                // var curr_month = $scope.editContractData.startDate.getMonth() + 1; //Months are zero based
                // if (curr_month.length == 1) {
                //     curr_month = '0' + curr_month;
                // }
                // var curr_year = $scope.editContractData.startDate.getFullYear();
                // $scope.editContractData.startDate = curr_year + "-" + curr_month + "-" + curr_date;
                // console.log($scope.editContractData.startDate);

                if ($scope.editContractData.endDate != null) {
                    $scope.editContractData.endDate = new Date($scope.editContractData.endDate)
                }
                // var curr_date = $scope.editContractData.endDate.getDate();
                // if (curr_date.length == 1) {
                //     curr_date = '0' + curr_date;
                // }
                // var curr_month = $scope.editContractData.endDate.getMonth() + 1; //Months are zero based
                // if (curr_month.length == 1) {
                //     curr_month = '0' + curr_month;
                // }
                // var curr_year = $scope.editContractData.endDate.getFullYear();
                // $scope.editContractData.endDate = curr_year + "-" + curr_month + "-" + curr_date;
            }

            $scope.editContract = function() {
                if ($scope.editContractData.startDate != null) {
                    $scope.editContractData.startDate = $scope.editContractData.startDate.getTime();
                }
                if ($scope.editContractData.endDate != null) {
                    $scope.editContractData.endDate = $scope.editContractData.endDate.getTime();
                }
                if ($scope.editContractData.cooperateActivityValue != null) {
                    $scope.editContractData.cooperateActivityValue = $scope.editContractData.cooperateActivityValue.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    // console.log($scope.editContractData.cooperateActivityValue);
                }
                vnuService.editContract($scope.editContractData, $scope.editContractData.id)
                    .then(function() {
                        $("#close_modal_edit").trigger('click');
                        $scope.alertSuccess("Sửa hợp đồng thành công!", "");
                        $scope.getAllContract();
                    }, function(error) {
                        console.log(error);
                    })
            }
            $scope.editActivity = function(activityId) {
                // $('#nation_' + nationId).html('<div class="col-md-4 col-sm-4 col-xs-6">' + 
                //     '<input type="text" name="country" class="form-control col-md-6" ng-model="' + nationName + '" required /></div>');
                var activity = $('#activity' + activityId).text();
                $('#activity' + activityId).html('<input class="form-control col-md-6" id="activity_value_' + activityId + '" value="' + activity + '" style="border-radius:3px; border: 1px solid;"/>');
                $('#edit_activity_' + activityId).hide();
                $('#save_edit_activity_' + activityId).show();
            }
            $scope.saveEditActivity = function(activityId) {
                // console.log(nationId);
                var activity = $('#activity_value_' + activityId).val();
                // console.log(v);
                $scope.request = {
                    id: activityId,
                    cooperateActivity: activity
                }
                console.log($scope.request);
                vnuService.editActivity($scope.request)
                    .then(function() {
                        $('#edit_activity_' + activityId).show();
                        $('#save_edit_activity_' + activityId).hide();
                        $('#activity' + activityId).html(activity);
                        $scope.alertSuccess('Sửa hoạt động thành công!', 'successdelete_edit');
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.deleteActivity = function() {
                vnuService.deleteActivity($scope.confirmDeleteId)
                    .then(function() {
                        $scope.alertSuccess('Xóa hoạt động thành công!', 'successdelete_edit');
                        $('#tr_activity_' + $scope.confirmDeleteId).remove();
                        $('#close_modal_delete_activity').trigger('click');
                    }, function(error) {
                        console.log(error);
                        $('#close_modal_delete_activity').trigger('click');
                        $scope.alertDanger(error.data.message, 'danger');
                    })
            }

            $scope.confirmDelete = function(id, name) {
                $scope.confirmDeleteId = id;
                $scope.confirmDeleteName = name;
            }

            $scope.close = function(id) {
                $('#' + id).modal('hide');
            }

            $scope.deleteContract = function() {
                // alert($scope.contractId);
                vnuService.deleteContract($scope.confirmDeleteId)
                    .then(function() {
                        $scope.alertSuccess("Xóa hợp đồng thành công!", "");
                        if ($state.current.url == '/information') {
                            $('#delete_contract').modal('hide');
                            var index = $scope.Partner.contracts.findIndex(x => x.id === $scope.confirmDeleteId);
                            console.log(index);
                            if (index != -1) {
                                $scope.Partner.contracts.splice(index, 1);
                            }
                            // $scope.getAllContractOfPartner();
                        } else if ($state.current.url == '/contract') {
                            $scope.getAllContract();
                            $("#close_modal_delete").trigger('click');
                        }
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

            $scope.confirmDeleteTypeContract = function(typeContractId) {
                // $('#confirm_delete_typeContract_' + typeContractId).html(''+
                //         '<button type="button" class="btn btn-default btn-xs" ng-click="cancerDeleteTypeContract(' + typeContractId +')">Hủy</button> ' +
                //         '<button type="button" class="btn btn-success btn-xs" ng-click="deletetypeContract(' + typeContractId + ')">Xác nhận</button>');
                $('#i_confirm_delete_typeContract_' + typeContractId).hide();
                $('#button_confirm_delete_typeContract_' + typeContractId).show();
                $('#button_delete_typeContract_' + typeContractId).show();
            }

            $scope.cancerDeleteTypeContract = function(typeContractId) {
                $('#i_confirm_delete_typeContract_' + typeContractId).show();
                $('#button_confirm_delete_typeContract_' + typeContractId).hide();
                $('#button_delete_typeContract_' + typeContractId).hide();
            }

            $scope.deleteTypeContract = function(typeContractId) {
                vnuService.deleteTypeContract(typeContractId)
                    .then(function() {
                        $scope.alertSuccess("Xóa loại hợp đồng thành công!", '');
                        // $('#tr_typeContract_' + typeContractId).remove();
                        $scope.getAllTypeContract();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.editUetMan = function(uetManId) {
                var uetMan = $('#uetMan_' + uetManId).text();
                $('#uetMan_' + uetManId).html('<input id="uetMan_value_' + uetManId + '" value="' + uetMan + '" style="border-radius:3px; border: 1px solid;" required/>')
                $('#edit_uetMan_' + uetManId).hide();
                $('#save_edit_uetMan_' + uetManId).show();
                $('#button_cancel_edit_uetMan_' + uetManId).show();
            }

            $scope.cancelEditUetMan = function(uetMan) {
                console.log(uetMan);
                $('#edit_uetMan_' + uetMan.id).show();
                $('#save_edit_uetMan_' + uetMan.id).hide();
                $('#button_cancel_edit_uetMan_' + uetMan.id).hide();
                $('#uetMan_' + uetMan.id).html(uetMan.uetManName);
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
                            $('#uetMan_' + uetManId).html(uetManName);
                            $('#save_edit_uetMan_' + uetManId).hide();
                            $('#button_cancel_edit_uetMan_' + uetManId).hide();
                            $scope.alertSuccess('Sửa người kí kết (VNU-UET) thành công!', '');
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }
            }

            $scope.confirmDeleteUetMan = function(uetManId) {
                $('#i_confirm_delete_uetMan_' + uetManId).hide();
                $('#button_confirm_delete_uetMan_' + uetManId).show();
                $('#button_delete_uetMan_' + uetManId).show();
            }

            $scope.cancerDeleteUetMan = function(uetManId) {
                $('#i_confirm_delete_uetMan_' + uetManId).show();
                $('#button_confirm_delete_uetMan_' + uetManId).hide();
                $('#button_delete_uetMan_' + uetManId).hide();
            }

            $scope.deleteUetMan = function(uetManId) {
                vnuService.deleteUetMan(uetManId)
                    .then(function() {
                        $scope.alertSuccess("Xóa người kí kết (VNU-UET) thành công!", '');
                        $('#delete_uet_man').modal('hide');
                        $scope.getAllUetMan();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.editUnitName = function(unitNameId) {
                var unitName = $('#unitName_' + unitNameId).text();
                $('#unitName_' + unitNameId).html('<input id="unitName_value_' + unitNameId + '" value="' + unitName + '" style="border-radius:3px; border: 1px solid;" required/>')
                $('#edit_unitName_' + unitNameId).hide();
                $('#save_edit_unitName_' + unitNameId).show();
                $('#button_cancel_edit_unitName_' + unitNameId).show();
            }

            $scope.cancelEditUnitName = function(unitName) {
                console.log(unitName);
                $('#edit_unitName_' + unitName.id).show();
                $('#save_edit_unitName_' + unitName.id).hide();
                $('#button_cancel_edit_unitName_' + unitName.id).hide();
                $('#unitName_' + unitName.id).html(unitName.unitName);
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
                            $('#unitName_' + unitNameId).html(unitName);
                            $('#save_edit_unitName_' + unitNameId).hide();
                            $('#button_cancel_edit_unitName_' + unitNameId).hide();
                            $scope.alertSuccess('Sửa Đơn vị theo dõi thành công!', '');
                        }, function(error) {
                            console.log(error);
                            $scope.alertDanger(error.data.message, 'danger');
                        })
                }
            }

            $scope.confirmDeleteUnitName = function(unitNameId) {
                $('#i_confirm_delete_unitName_' + unitNameId).hide();
                $('#button_confirm_delete_unitName_' + unitNameId).show();
                $('#button_delete_unitName_' + unitNameId).show();
            }

            $scope.cancerDeleteUnitName = function(unitNameId) {
                $('#i_confirm_delete_unitName_' + unitNameId).show();
                $('#button_confirm_delete_unitName_' + unitNameId).hide();
                $('#button_delete_unitName_' + unitNameId).hide();
            }

            $scope.deleteUnitName = function(unitNameId) {
                vnuService.deleteUnitName(unitNameId)
                    .then(function() {
                        $scope.alertSuccess("Xóa Đơn vị theo dõi công!", '');
                        $('#delete_unit').modal('hide');
                        $scope.getAllUnitName();
                    }, function(error) {
                        console.log(error);
                        $scope.alertDanger(error.data.message, '');
                    })
            }

            $scope.date = function() {
                console.log($scope.input.startDate.getTime());
            }

            $scope.selectContract = function(contract) {
                // console.log(contract);
            }
            $scope.alertWarning = function(warning, timeout) {
                $scope.warningMessage = warning;
                $scope.warning = true;
                $timeout(function() {
                    // 
                    $(".alert").fadeTo(500, 0).slideUp(500, function() {
                        $scope.warning = false;
                        $scope.warningMessage = "";
                    });
                }, timeout);

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