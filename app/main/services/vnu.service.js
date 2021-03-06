(function() {
    'use strict';

    angular.module('services')
        .factory('vnuService', vnuService);

    vnuService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function vnuService($log, $http, $q, $rootScope) {
        return {
            createUnit: createUnit,
            createUetMan: createUetMan,
            createTypeContract: createTypeContract,
            getAllTypeContract: getAllTypeContract,
            getAllUnitName: getAllUnitName,
            getAllUetMan: getAllUetMan,
            getAllContract: getAllContract,
            createContract: createContract,
            editContract: editContract,
            deleteContract: deleteContract,
            editTypeContract: editTypeContract,
            editUetMan: editUetMan,
            editUnitName: editUnitName,
            deleteTypeContract: deleteTypeContract,
            deleteUnitName: deleteUnitName,
            deleteUetMan: deleteUetMan,
            checkContract: checkContract,
            importExcel: importExcel,
            editActivity: editActivity,
            deleteActivity: deleteActivity,
            createAccount: createAccount,
            getAllContractOfPartner: getAllContractOfPartner,
            shareContract: shareContract,
            getAllContractShareOfContract: getAllContractShareOfContract,
            getContractOfUnit: getContractOfUnit,
            editCooperateActivityDetail: editCooperateActivityDetail,
            getAllUetManRolesAndSigningLevel: getAllUetManRolesAndSigningLevel,
            getAllRolesAndSigningLevel: getAllRolesAndSigningLevel,
            createUniversityAccount: createUniversityAccount,
            getContractByRoleAndSigningLevel: getContractByRoleAndSigningLevel,
            getUnitNameByRolesAndSigningLevel: getUnitNameByRolesAndSigningLevel,
            renewContract: renewContract,
            removeRenew: removeRenew,
            changePassword: changePassword
        };

        function changePassword(data) {
            return $http({
                url: $rootScope.serverAdd + '/changePassword',
                method: 'PUT',
                data: data
            })
        }

        function removeRenew(contractId) {
            return $http({
                url: $rootScope.serverAdd + '/contract/' + contractId + '/remove/renew',
                method: 'POST'
            })
        }

        function getUnitNameByRolesAndSigningLevel() {
            return $http({
                url: $rootScope.serverAdd + '/unit/rolesAndSigningLevel',
                method: 'GET'
            })
        }

        function getContractByRoleAndSigningLevel() {
            return $http({
                url: $rootScope.serverAdd + '/contract/RoleAndSigningLevel',
                method: 'GET'
            })
        }

        function createUniversityAccount(data) {
            return $http({
                url: $rootScope.serverAdd + '/account/university/create',
                method: 'POST',
                data: data
            })
        }

        function getAllRolesAndSigningLevel() {
            return $http({
                url: $rootScope.serverAdd + '/rolesAndSigningLevel',
                method: 'GET'
            })
        }

        function getAllUetManRolesAndSigningLevel() {
            return $http({
                url: $rootScope.serverAdd + '/uetMan/rolesAndSigningLevel',
                method: 'GET'
            })
        }

        function editCooperateActivityDetail(data) {
            return $http({
                url: $rootScope.serverAdd + '/cooperate/activity/detail/edit',
                method: 'POST',
                data: data
            })
        }

        function getContractOfUnit() {
            return $http({
                url: $rootScope.serverAdd + '/unit/contract',
                method: 'GET'
            })
        }

        function getAllContractShareOfContract(contractId) {
            return $http({
                url: $rootScope.serverAdd + '/contract/share/contract/' + contractId,
                method: 'GET'
            })
        }

        function shareContract(data) {
            return $http({
                url: $rootScope.serverAdd + '/contract/share/create',
                method: 'POST',
                data: data
            })
        }

        function getAllContractOfPartner(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId +'/contract/',
                method: 'GET'
            })
        }

        function createAccount(data, unitNameId) {
            return $http({
                url: $rootScope.serverAdd + '/unit/' + unitNameId + '/account/create',
                method: 'POST',
                data: data
            })
        }

        function deleteActivity(cooperateActivityId) {
            return $http({
                url: $rootScope.serverAdd + '/cooperateActivity/' + cooperateActivityId + '/delete',
                method: 'DELETE'
            })
        }

        function editActivity(data) {
            return $http({
                url: $rootScope.serverAdd + '/cooperateActivity/edit',
                method: 'PUT',
                data: data
            })
        }

        function importExcel(data) {
            return $http({
                url: $rootScope.serverAdd + '/contract/excel',
                method: 'POST',
                data: data
            })
        }

        function checkContract(data) {
            return $http({
                url: $rootScope.serverAdd + '/checkContract',
                method: 'POST',
                data: data
            })
        }

        function deleteUnitName(unitNameId) {
            return $http({
                url: $rootScope.serverAdd + '/unit/' + unitNameId + '/delete',
                method: 'DELETE'
            })
        }

        function deleteUetMan(uetManId) {
            return $http({
                url: $rootScope.serverAdd + '/uetMan/' + uetManId + '/delete',
                method: 'DELETE'
            })
        }

        function deleteTypeContract(typeContractId) {
            return $http({
                url: $rootScope.serverAdd + '/typeContract/' + typeContractId + '/delete',
                method: 'DELETE'
            })
        }

        function editTypeContract(data, typeContractId) {
            return $http({
                url: $rootScope.serverAdd + '/typeContract/edit',
                method: 'PUT',
                data: data
            })
        }

        function editUetMan(data, uetManId) {
            return $http({
                url: $rootScope.serverAdd + '/uetMan/edit',
                method: 'PUT',
                data: data
            })
        }

        function editUnitName(data, unitNameId) {
            return $http({
                url: $rootScope.serverAdd + '/unit/edit',
                method: 'PUT',
                data: data
            })
        }

        function deleteContract(contractId) {
            return $http({
                url: $rootScope.serverAdd + '/contract/' + contractId + '/delete',
                method: 'DELETE'
            })
        }

        function renewContract(data, contractId) {
            return $http({
                url: $rootScope.serverAdd + '/contract/' + contractId + '/renew',
                method: 'POST',
                data: data
            })
        }

        function editContract(data, contractId) {
            return $http({
                url: $rootScope.serverAdd + '/contract/' + contractId + '/edit',
                method: 'POST',
                data: data
            })
        }

        function createContract(data) {
            return $http({
                url: $rootScope.serverAdd + '/contract/create',
                method: 'POST',
                data: data
            })
        }

        function getAllContract(data) {
            if ($rootScope.role == 'UNIT') {
                return $http({
                    url: $rootScope.serverAdd + '/unit/' + $rootScope.id + '/contract',
                    method: 'GET'
                })
            } else {
                return $http({
                    url: $rootScope.serverAdd + '/contract',
                    method: 'GET'
                })
            }

        }

        function getAllTypeContract(data) {
            return $http({
                url: $rootScope.serverAdd + '/typeContract',
                method: 'GET'
            })
        }

        function getAllUnitName(data) {
            return $http({
                url: $rootScope.serverAdd + '/unit',
                method: 'GET'
            })
        }

        function getAllUetMan(data) {
            return $http({
                url: $rootScope.serverAdd + '/uetMan',
                method: 'GET'
            })
        }

        function createUnit(data) {
            return $http({
                url: $rootScope.serverAdd + '/unit/create',
                method: 'POST',
                data: data
            })
        }

        function createUetMan(data) {
            return $http({
                url: $rootScope.serverAdd + '/uetMan/create',
                method: 'POST',
                data: data
            })
        }

        function createTypeContract(data) {
            return $http({
                url: $rootScope.serverAdd + '/typeContract/create',
                method: 'POST',
                data: data
            })
        }
    }
}());