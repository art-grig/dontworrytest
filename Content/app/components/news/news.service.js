'use strict';

angular.module('app')
    .factory('newsService', ['$http', 'URLS', 'authService','fileService',
        function ($http, URLS, authService, fileService) {
            return {
                getAll: function () {
                    return $http.get(URLS.API.BASE + 'news');
                },
                getTop: function (count) {
                    return $http.get(URLS.API.BASE + 'news/top/' + count);
                },
                get: function (id) {
                    return $http.get(URLS.API.BASE + 'news/' + id);
                },
                imageUrl: function (id) {
                    return URLS.API.BASE + 'news/' + id + '/image';;
                },
                create: function (newsFeed) {
                    var data =
                    {
                        Title: newsFeed.Title,
                        Text: newsFeed.Text,
                        Date: newsFeed.Date
                    };
                    return $http.post(URLS.API.BASE + 'news', data)
                        .success(function (data) {
                            if (newsFeed.Image)
                                fileService.uploadFileToUrl(this.imageUrl(data.ID), newsFeed.Image);
                        }.bind(this));
                },
                update: function(newsFeed){
                    var data =
                    {
                        Title: newsFeed.Title,
                        Text: newsFeed.Text,
                        Date: newsFeed.Date
                    };
                    return $http.post(URLS.API.BASE + 'news/' + newsFeed.ID, data)
                        .success(function (data) {
                            if (newsFeed.Image)
                                fileService.uploadFileToUrl(this.imageUrl(newsFeed.ID), newsFeed.Image);
                        }.bind(this));
                },
                modify: function(newsFeed){
                    if (newsFeed.ID > 0)
                        return this.update(newsFeed);
                    else
                        return this.create(newsFeed);
                },
                delete: function (newsFeed) {
                    return $http.delete(URLS.API.BASE + 'news/' + newsFeed.ID);
                }
            };
        }]);