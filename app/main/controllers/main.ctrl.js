(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$window',
            function($scope, $rootScope, $location, $window) {

                $rootScope.serverAdd = "http://localhost:8080";
                $rootScope.clientAdd = "http://localhost:8100";
                if(sessionStorage['User-Data']){
                    $rootScope.loggedIn = true;
                }
                // $rootScope.loggedIn = false;
                // if ($cookies.get('User-Data')) {
                //     // $sessionStorage.User_Data = $cookies.get('User-Data');
                //     sessionStorage.setItem('User-Data', $cookies.get('User-Data'));
                //     // console.log(sessionStorage['User-Data']);
                //     $rootScope.loggedIn = true;
                //     $rootScope.index = true;
                //     $rootScope.id = $cookies.get('id');
                //     $rootScope.studentId = $cookies.get('studentId');
                //     $rootScope.username = $cookies.get('username');
                //     $rootScope.role = $cookies.get('role');
                //     $rootScope.internId = $cookies.get('internId');
                //     if($rootScope.role == "NORMAL_PARTNER" || $rootScope.role == "VIP_PARTNER"){
                //         $window.location.href = $rootScope.clientAdd + '/#/partner/info';
                //     }
                // } else {
                //     $rootScope.loggedIn = false;
                //     $location.path('/login');
                // }

            }
        ])
}());
