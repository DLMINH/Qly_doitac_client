'use strict';

// Declare app level module which depends on views, and components
angular.module('services', []);
angular.module('myApp', [
    'ui.router',
    'ngRoute',
    'services',
    'user',
    'nation',
    'partner',
    'vnu',
    'contract'
]).
config(['$locationProvider', '$routeProvider', '$stateProvider', function($locationProvider, $routeProvider, $stateProvider) {
    $locationProvider.hashPrefix('');

    if (sessionStorage["User-Data"] == null) {
        $routeProvider
            .when("/login", {
                templateUrl: "/main/views/login/login.html",
                controller: "userCtrl"
            }).otherwise({ redirectTo: "/login" });
    } else {
        // $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('/', {
                url : '/',
                templateUrl : 'index.html'
            })
            .state('/404', {
                url: '/404',
                templateUrl: '404.html'
            })
            .state('/table', {
                url: '/table',
                templateUrl: '/main/views/table/table.html'
            })
            .state('/nation_continent', {
                url : '/nation_continent',
                templateUrl : 'main/views/nation_continent/nation_continent.html',
                controller : 'nationCtrl'
            })
            .state('/partner', {
                url : '/partner',
                templateUrl : 'main/views/partner/partner.all.html',
                controller : 'partnerCtrl'
            })
            .state('/vnu', {
                url : '/vnu',
                templateUrl : 'main/views/vnu/vnu.html',
                controller : 'vnuCtrl'
            })
            .state('/contract', {
                url : '/contract',
                templateUrl : 'main/views/contract/contract.html',
                controller : 'vnuCtrl'
            });
    }
}]);
