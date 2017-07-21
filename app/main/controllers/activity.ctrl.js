(function() {
    var app = angular.module("activity", []);
    app.controller('actCtrl', ['$scope', 'activityService', '$location', '$rootScope', '$window',
        function($scope, activityService, $location, $rootScope, $window) {
            $scope.getAllActivity = function(){
                activityService.getAllActivity()
                    .then(function(response){
                        $scope.allActivity = response.data;
                    }, function(error){
                        console.log(error);
                    })
            }
        }
    ])
}());
