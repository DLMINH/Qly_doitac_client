(function() {
    'use strict';

    angular.module('services')
        .factory('userService', userService);

    userService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function userService($log, $http, $q, $rootScope) {
        return {
            login: login,
            logout: logout
        };

        function login(data) {
            return $http({
                url: $rootScope.serverAdd + '/admin/login',
                method: 'POST',
                data: data
            })
        }

        function logout() {
            return $http({
                url: $rootScope.serverAdd + '/logout',
                method: 'GET'
            })
        }
    }
}());