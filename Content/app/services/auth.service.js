'use strict';

angular.module('app')
    .factory('authService', ['$http', 'URLS', 'localStorageService', '$cookies',
        function ($http, URLS, localStorageService, $cookies) {
            return {
                setToken: function (token) {
                    //localStorageService.set('token', token);
                    $cookies.putObject(URLS.AUTHCOOKIENAME, token);
                },
                getToken: function () {
                    var data = null;
                    //data = localStorageService.get('token');
                    if (!data) {
                        data = $cookies.get(URLS.AUTHCOOKIENAME);
                        if (data && typeof (data) == "string")
                            data = JSON.parse(data);
                    }

                    return new Token(data);
                },
                getTokenKey: function () {
                    var token = this.getToken();
                    return (token && token.Code) ? token.Code : null;
                },
                removeToken: function () {
                    //localStorageService.remove('token');
                    $cookies.remove(URLS.AUTHCOOKIENAME);
                },
                login: function (login, password, onSuccess, onError) {

                    // auth request body to be send
                    var request = { 'Login': login, 'Password': password };

                    return $http.post(URLS.API.BASE + 'auth/login', request)
                        .success(function (data) {
                            // set local storage variable
                            this.setToken(data);

                            // set auth header to all requests
                            this.redefineHeaders();

                            // continue with success
                            if (onSuccess) onSuccess(data);
                        }.bind(this))
                        .error(function (data, status) {
                            // remove local storage variable
                            this.removeToken();

                            // set auth header to null
                            this.redefineHeaders(null);

                            // continue with error
                            if (onError) onError(data, status);
                        }.bind(this));
                },
                logout: function () {
                    // remove local storage variable
                    this.removeToken();

                    // set auth header to null
                    this.redefineHeaders(null);
                },
                isAuthenticated: function () {
                    var token = this.getToken();
                    return token && token.isAuthenticated();
                },
                isInRole: function (role) {
                    var token = this.getToken();
                    return token && token.isInRole(role);
                },
                changePassword: function (model) {
                    var data = {
                        OldPassword: model.oldPassword,
                        NewPassword: model.newPassword
                    };
                    return $http.post(URLS.API.BASE + 'account/changepassword', data);
                },
                forget: function (login) {
                    var data = {
                        Login: login
                    };
                    return $http.post(URLS.API.BASE + 'account/forget', data);
                },
                recovery: function (login, code, pin) {
                    var data = {
                        CompletionCode: code,
                        Pin: pin
                    };
                    return $http.post(URLS.API.BASE + 'account/recovery', data);
                },
                redefineHeaders: function (authorizationHeader) {
                    if (authorizationHeader == undefined) {
                        var key = this.getTokenKey();
                        authorizationHeader = (key) ? 'Token ' + key : null;
                    }

                    $http.defaults.headers.common['Authorization'] = authorizationHeader;
                }
            };
        }]);