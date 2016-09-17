'use strict';

angular.module('app')
    .factory('dataService', ['$http', 'URLS', 'authService', 
        function ($http, URLS, authService) {
            return {
                getData: function () {
                    return $http.get('/Content/data/data.json');
                }
            };
        }]);