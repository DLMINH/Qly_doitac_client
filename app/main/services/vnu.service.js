(function() {
    'use strict';

    angular.module('services')
        .factory('vnuService', vnuService);

    vnuService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function vnuService($log, $http, $q, $rootScope) {
        return {
        	createUnit : createUnit,
            createUetMan : createUetMan,
            createTypeContract : createTypeContract,
            getAllTypeContract : getAllTypeContract,
            getAllUnit : getAllUnit,
            getAllUetMan :getAllUetMan,
            getAllContract : getAllContract,
            createContract : createContract,
            editContract : editContract,
            deleteContract :deleteContract
        };

        function deleteContract(contractId){
            return $http({
                url:$rootScope.serverAdd + '/contract/' + contractId + '/delete',
                method: 'DELETE'
            })
        }

        function editContract(data, contractId){
            return $http({
                url:$rootScope.serverAdd + '/contract/' + contractId + '/edit',
                method: 'PUT',
                data: data
            })
        }

        function createContract(data){
            return $http({
                url:$rootScope.serverAdd + '/contract/create',
                method: 'POST',
                data: data
            })
        }

        function getAllContract(data){
            return $http({
                url:$rootScope.serverAdd + '/contract',
                method: 'GET'
            })
        }

        function getAllTypeContract(data){
            return $http({
                url:$rootScope.serverAdd + '/typeContract',
                method: 'GET'
            })
        }

        function getAllUnit(data){
            return $http({
                url:$rootScope.serverAdd + '/unit',
                method: 'GET'
            })
        }

        function getAllUetMan(data){
            return $http({
                url:$rootScope.serverAdd + '/uetMan',
                method: 'GET'
            })
        }

        function createUnit(data){
            return $http({
                url:$rootScope.serverAdd + '/unit/create',
                method: 'POST',
                data: data
            })
        }

        function createUetMan(data){
            return $http({
                url:$rootScope.serverAdd + '/uetMan/create',
                method: 'POST',
                data: data
            })
        }

        function createTypeContract(data){
            return $http({
                url:$rootScope.serverAdd + '/typeContract/create',
                method: 'POST',
                data: data
            })
        }
    }
}());
