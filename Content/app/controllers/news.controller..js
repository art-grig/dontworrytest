/**
 * Created by art-grig on 9/17/2016.
 */
angular.module('app',[])
.controller('NewsCtrl', function($http, $scope) {
    $http.get('http://igorapi.esy.es/dwpbar/newsfeed.php', {})
        .success(function(data) {

            var buf = data.response.items.sort(function(a, b) {
                return a.date > b.date;
            });
            $scope.newsList = buf.slice(0,4);
            console.log($scope.newsList);
        })
        .error(function(error) {
            console.log('error');
        });

});