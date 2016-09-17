'use strict';

angular.module('app')
    .controller('newsController', ['$scope', '$element', 'newsService', '$sce', '$location', '$anchorScroll', '$timeout',
        function ($scope, $element, newsService, $sce, $location, $anchorScroll, $timeout) {

            this.news = [];
            this.newsFeed = null;
            this.newsFeedImage = null;

            this.remarkable = null;

            this.reloadAll = function () {
                newsService.getAll()
                    .success(function (data) {
                        this.news = [];
                        for (var i = 0; i < data.length; i++)
                            this.news.push(new NewsFeed(data[i]));
                    }.bind(this))
                    .finally(function () {
                        $timeout(function () {
                            this.scroll();
                        }.bind(this));
                    }.bind(this));
            };

            this.scroll = function () {
                try {
                    $anchorScroll.yOffset = 150;
                    $anchorScroll();
                }
                catch (ex) { }
            };

            this.reloadTop = function (count) {
                newsService.getTop(count).success(function (data) {
                    this.news = [];
                    for (var i = 0; i < data.length; i++)
                        this.news.push(new NewsFeed(data[i]));
                }.bind(this));
            };

            this.display = function (newsFeed) {
                this.newsFeed = newsFeed ? newsFeed : new NewsFeed();
                $('#modal-news').modal('show');
            };

            this.modify = function (newsFeed) {
                newsService.modify(newsFeed)
                    .success(function (data) {
                        this.reloadAll();
                    }.bind(this))
                    .finally(function () {
                        $('#modal-news').modal('hide');
                        this.newsFeed = null;

                        if ($scope.newsForm) {
                            $scope.newsForm.$setPristine();
                            $scope.newsForm.$setUntouched();
                        }
                    }.bind(this));
            };

            this.delete = function (newsFeed) {
                newsService.delete(newsFeed).success(function (data) {
                    this.reloadAll();
                }.bind(this));
            };

            this.imageUrl = function (newsFeed) {
                if (!newsFeed || newsFeed.ID <= 0)
                    return "";
                return newsService.imageUrl(newsFeed.ID);
            };

            this.getContent = function (newsFeed) {
                if (!newsFeed)
                    return '';

                if (!this.remarkable)
                    this.remarkable = new Remarkable();

                var html = this.remarkable.render(newsFeed.Text);

                return $sce.trustAsHtml(html);
            };
        }]);