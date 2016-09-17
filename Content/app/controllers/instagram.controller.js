/**
 * Created by art-grig on 9/17/2016.
 */
angular.module('app',[])
.controller('InstagramCtrl', function($http, $scope, Instagram) {
    var test;
    Instagram.get();
    console.log(test);
});