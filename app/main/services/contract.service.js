(function() {
    'use strict';

    angular.module('services')
        .factory('contractService', contractService);

    contractService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function contractService($log, $http, $q, $rootScope) {
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
