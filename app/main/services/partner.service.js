(function() {
    'use strict';

    angular.module('services')
        .factory('partnerService', partnerService);

    partnerService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function partnerService($log, $http, $q, $rootScope) {
        return {
            getAllPartner: getAllPartner,
            createPartner: createPartner,
            editPartnerInfo: editPartnerInfo,
            getAllPartnerContact: getAllPartnerContact,
            editPartnerContact: editPartnerContact,
            deletePartner: deletePartner,
            deletePartnerContact: deletePartnerContact,
            createPartnerContact: createPartnerContact,
            getAnnualActivity: getAnnualActivity,
            createAnnaulActivity: createAnnaulActivity,
            editAnnualActivity: editAnnualActivity,
            deleteAnnualActivity: deleteAnnualActivity,
            getAllContractOfPartner: getAllContractOfPartner,
            getAllAnnualActivityOfPartner: getAllAnnualActivityOfPartner,
            getAllAnnualActivity: getAllAnnualActivity,
            getPartnerAndId: getPartnerAndId,
            getAllAnnualActivityOfContract: getAllAnnualActivityOfContract
        };

        function getPartnerAndId(type) {
            return $http({
                url: $rootScope.serverAdd + '/partner/nameAndId/user/' + type,
                method: 'GET'
            })
        }

        // function getPartnerAndId() {
        //     return $http({
        //         url: $rootScope.serverAdd + '/partner/id',
        //         method: 'GET'
        //     })
        // }

        function getAllAnnualActivity() {
            return $http({
                url: $rootScope.serverAdd + '/annualActivity',
                method: 'GET'
            })
        }

        function getAllAnnualActivityOfContract(contractId) {
            return $http({
                url: $rootScope.serverAdd + '/contract/annualActivity/' + contractId,
                method: 'GET'
            })
        }

        function getAllAnnualActivityOfPartner(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/annualActivity/' + partnerId,
                method: 'GET'
            })
        }

        function getAllContractOfPartner(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/contract/',
                method: 'GET'
            })
        }

        function deleteAnnualActivity(annualActivityId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/annualActivity/delete',
                method: 'DELETE',
                data: annualActivityId
            })
        }

        function editAnnualActivity(data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/annualActivity/edit',
                method: 'POST',
                data: data
            })
        }

        function createAnnaulActivity(data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/annualActivity/add',
                method: 'POST',
                data: data
            })
        }

        function getAnnualActivity(annualActivityId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/annualActivity',
                method: 'GET',
                data: annualActivityId
            })
        }

        function createPartnerContact(data, partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/contact/create',
                method: 'POST',
                data: data
            })
        }

        function deletePartnerContact(contactId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/contact/' + contactId + '/delete',
                method: 'DELETE'
            })
        }

        function deletePartner(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/delete',
                method: 'DELETE'
            })
        }

        function getAllPartnerContact(partnerId) {
            return $http({
                url: $rootScope.serverAdd + '/partner/' + partnerId + '/contact',
                method: 'GET'
            })
        }

        function getAllPartner() {
            return $http({
                url: $rootScope.serverAdd + '/partner/fit',
                method: 'GET'
            })
        }

        function createPartner(data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/create',
                method: 'POST',
                data: data
            })
        }

        function editPartnerInfo(data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/edit',
                method: 'PUT',
                data: data
            })
        }

        function editPartnerContact(data) {
            return $http({
                url: $rootScope.serverAdd + '/partner/contact/edit',
                method: 'PUT',
                data: data
            })
        }
    }
}());