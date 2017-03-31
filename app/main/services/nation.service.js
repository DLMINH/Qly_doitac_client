(function() {
    'use strict';

    angular.module('services')
        .factory('nationService', nationService);

    nationService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function nationService($log, $http, $q, $rootScope) {
        return {
        	getAllContinent: getAllContinent,
            createNation : createNation,
            createContinent: createContinent
        };

        function getAllContinent(data){
            return $http({
                url : $rootScope.serverAdd + '/continent',
                method: 'GET'
            })
        }

        function createNation(data, continentId){
            return $http({
                url : $rootScope.serverAdd + '/continent/' + continentId + '/nation/create',
                method : 'POST',
                data : data
            })
        }

        function createContinent(data){
            return $http({
                url : $rootScope.serverAdd + '/continent/create',
                method : 'POST',
                data : data
            })
        }
    }
}());
