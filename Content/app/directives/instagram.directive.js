/**
 * Created by art-grig on 9/17/2016.
 */
    angular.module('app', [])
      directive('ui-instagram', function() {
        return {
            restrict: 'EA',
            controller: function($scope, $attrs, Instagram) {
                $scope.grams = [];
                console.log('testtesttes');
                return Instagram.get($attrs.userId, $attrs.clientId, function(grams) {
                    return $scope.grams = grams;
                });
            }
        };
    });

