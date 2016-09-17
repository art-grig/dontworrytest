'use strict';
angular.module('app')
    .directive('errors', [function () {
        return {
            restrict: 'AE',
            scope: {
                errors: '=errors'
            },
            templateUrl: '/Content/app/partials/errors.partial.html',
            require: ['ngModel'],
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', '$element',
                function ($scope, $rootScope, $element) {

                }]
        };
    }]);