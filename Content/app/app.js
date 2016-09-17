'use strict';

var app = angular.module('app', ['ngCookies', /*'ngMessages',*/ 'ngMask', 'LocalStorageModule']);

app.config(['$compileProvider', 'localStorageServiceProvider',
    function ( $compileProvider, localStorageServiceProvider) {
        Date.prototype.toRussianString = function () {
            var year = this.getFullYear();
            var month = this.getMonth() + 1;
            if (month < 10)
                month = "0" + month.toString();
            var day = this.getDate();

            return day + '.' + month + '.' + year;
        };

        localStorageServiceProvider.setPrefix('metib');

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|skype|tel|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

app.run(['$rootScope', 'authService',
    function ($rootScope, authService) {
        // setup Token to headers
        authService.redefineHeaders();

        $rootScope.authService = authService;
    }]);

app.constant('URLS', {
    AUTHCOOKIENAME: 'metibauth',
    IMAGES: {
        UNKNOWN: '/images/unknown.png'
        //AVATAR: '/JQFile/Avatar/'
    },
    API: {
        //BASE: 'http://localhost:62927/api/',
        BASE: 'http://api.factoring.metib.ru:8095/api/',
        //BASE: 'http://fsbu2:8095/api/',
        FILEUPLOAD: 'file/flow'
    }
});