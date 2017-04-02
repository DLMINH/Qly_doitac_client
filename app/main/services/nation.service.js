(function() {
    'use strict';

    angular.module('services')
        .factory('nationService', nationService);

    nationService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function nationService($log, $http, $q, $rootScope) {
        return {
        	getAllContinent: getAllContinent,
            createNation : createNation,
            createContinent: createContinent,
            deleteNation : deleteNation,
            editNation : editNation,
            editContinent : editContinent,
            deleteContinent : deleteContinent
        };

        function deleteContinent(continentId){
            return $http({
                url : $rootScope.serverAdd + '/continent/' + continentId + '/delete',
                method: 'DELETE'
            })
        }

        function editContinent(data){
            return $http({
                url : $rootScope.serverAdd + '/continent/edit',
                method: 'PUT',
                data : data
            })
        }

        function editNation(data){
            return $http({
                url : $rootScope.serverAdd + '/nation/edit',
                method: 'PUT',
                data : data
            })
        }

        function deleteNation(nationId){
            return $http({
                url : $rootScope.serverAdd + '/nation/' + nationId + '/delete',
                method: 'DELETE'
            })
        }

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
