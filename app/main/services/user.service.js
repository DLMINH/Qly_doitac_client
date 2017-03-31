(function() {
    'use strict';

    angular.module('services')
        .factory('userService', userService);

    userService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function userService($log, $http, $q, $rootScope) {
        return {
        	login: login
        };

        function login(data){
            return $http({
                url:$rootScope.serverAdd + '/login',
                method: 'POST',
                data: data
            })
        }
    }
}());
