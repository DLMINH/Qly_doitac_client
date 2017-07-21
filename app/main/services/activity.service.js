(function() {
    'use strict';

    angular.module('services')
        .factory('activityService', activityService);

    activityService.$inject = ['$log', '$http', '$q', '$rootScope'];

    function activityService($log, $http, $q, $rootScope) {
        return {
            getAllActivity : getAllActivity
        };

        function getAllActivity(data){
            return $http({
                url:$rootScope.serverAdd + '/activityLog',
                method: 'GET',
                data: data
            })
        }
    }
}());
