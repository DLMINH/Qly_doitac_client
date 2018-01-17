'use strict';

// Declare app level module which depends on views, and components
angular.module('services', []);
angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'ngRoute',
    'services',
    // 'user',
    'nation',
    'partner',
    'vnu',
    'ngSanitize',
    'contract',
    'angular-md5',
    'angucomplete-alt',
    'ng-clipboard'
]).
config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');

        if (sessionStorage["User-Data"] == null) {
            // $routeProvider
            //     .when("/login", {
            //         // templateUrl: "/main/views/login/login.html",
            //         controller: function(){
                        
            //             window.location.href = 'login.html';
            //         }
            //     }).otherwise({ redirectTo: "/login" });
        } else {
            $urlRouterProvider.otherwise('/partner/contract');
            $stateProvider
                .state('/404', {
                    url: '/404',
                    templateUrl: '404.html'
                })
                .state('/table', {
                    url: '/table',
                    templateUrl: '/main/views/table/table.html'
                })
                .state('/settings', {
                    url: '/settings',
                    templateUrl: 'main/views/settings/settings.html',
                    controller: 'vnuCtrl'
                })
                .state('/settings.vnu', {
                    url: '/vnu',
                    templateUrl: 'main/views/settings/settings.vnu.html'
                })
                .state('/settings.nation_continent', {
                    url: '/nation_continent',
                    templateUrl: 'main/views/settings/settings.nation_continent.html',
                    controller: 'nationCtrl'
                })
                .state('/partner', {
                    url: '/partner',
                    templateUrl: 'main/views/partner/partner.html',
                    controller: 'partnerCtrl'
                })
                .state('/partner.information', {
                    url: '/information',
                    views: {
                        '': {
                            templateUrl: 'main/views/partner/partner.all.html',
                            // controller: 'partnerCtrl'
                        },
                        'contract@/partner.information': {
                            templateUrl: 'main/views/partner/partner.contract.html',
                            // controller: 'partnerCtrl'
                        },
                        'activity@/partner.information': {
                            templateUrl: 'main/views/partner/partner.annualActivity.html',
                            // controller: 'partnerCtrl'
                        },
                        'information@/partner.information': {
                            templateUrl: 'main/views/partner/partner.information.html',
                            // controller: 'partnerCtrl'
                        },
                        'contact@/partner.information': {
                            templateUrl: 'main/views/partner/partner.contact.html',
                            // controller: 'partnerCtrl'
                        }
                    }
                })
                .state('/partner.activity', {
                    url: '/activity',
                    templateUrl: 'main/views/partner/partner.annualActivity.all.html',
                    controller: 'vnuCtrl'
                })
                .state('/partner.contract', {
                    url: '/contract',
                    views: {
                        '': {
                            templateUrl: 'main/views/contract/contract.all.html',
                            controller: 'vnuCtrl'
                        },
                        'contract@/partner.contract': {
                            templateUrl: 'main/views/partner/partner.contract.html'
                        },
                        'activity@/partner.contract': {
                            templateUrl: 'main/views/partner/partner.annualActivity.html'
                        },
                        'information@/partner.contract': {
                            templateUrl: 'main/views/partner/partner.information.html'
                        },
                        'contact@/partner.contract': {
                            templateUrl: 'main/views/partner/partner.contact.html'
                        },
                        'add_partner@/partner.contract': {
                            templateUrl: 'main/views/partner/partner.add.html'
                        },
                        'add_contract@/partner.contract': {
                            templateUrl: 'main/views/contract/contract.add.html'
                        },
                        'share_contract@/partner.contract': {
                            templateUrl: 'main/views/contract/contract.share.html',
                            controller: 'vnuCtrl'
                        },
                        'edit_contract@/partner.contract': {
                            templateUrl: 'main/views/contract/contract.edit.html',
                            // controller: 'vnuCtrl'
                        },
                        'insert_excel@/partner.contract': {
                            templateUrl: 'main/views/contract/contract.insert_excel.html',
                            // controller: 'vnuCtrl'
                        }
                    }
                });
                // .state('/activity', {
                //     url: '/activity',
                //     templateUrl: 'main/views/activity/activity.html',
                //     controller: 'actCtrl'
                // })
        }
    }])
    .filter('startFrom', function() {
        return function(input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    });