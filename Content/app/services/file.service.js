﻿angular.module('app')
    .factory('fileService', ['$http', 'URLS', 'authService',
        function ($http, URLS, authService) {
            return {
                // make (GUID) to differentiate uploads
                makeGuid: function () {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                    }

                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                },
                //getAvatarSrc: function (avatar) {
                //    if (avatar == undefined || avatar == null || avatar == '')
                //        return './images/avatar.jpg';

                //    if (avatar.startsWith('data:'))
                //        return avatar;

                //    return URLS.API.BASE + 'avatar/' + avatar;
                //},
                //getBlob: function (code) {
                //    return $http.get(URLS.API.BASE + 'file/' + code);
                //},
                //getBlobUrl: function (code) {
                //    return $http.get(URLS.API.BASE + 'file/' + code + '/url');
                //},
                //getBlobContentUrl: function (code) {
                //    let token = authService.getTokenKey();
                //    return URLS.API.BASE + 'file/' + code + '/content?Token=' + token;
                //},
                //getBlobAvatarUrl: function (code) {
                //    let token = authService.getTokenKey();
                //    if (!token)
                //        return;
                //    return URLS.API.BASE + 'file/' + code + '/avatar?Token=' + token;
                //},
                download: function (code) {
                    var token = authService.getTokenKey();
                    var url = URLS.API.BASE + 'file/' + code + '/content?Token=' + token;
                    $window.open(url);
                },

                uploadFileToUrl: function (url, file) {
                    var formdata = new FormData();
                    formdata.append('file', file);

                    return $http.post(url, formdata, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    });
                    //.success(function () {
                    //})
                    //.error(function () {
                    //});
                }
            };
        }]);