/**
 * Created by art-grig on 9/17/2016.
 */
angular.module('app',[])
.service('Instagram', function($http) {
    return {
        get: function(id, clientId, cb) {
            var URL;
            URL = "https://api.instagram.com/v1/users/" + id + "/media/recent/?client_id=" + clientId + "&callback=JSON_CALLBACK";
            return $http.jsonp(URL).success(function(resolution) {
                console.log(resolution);
                return cb(resolution.data);
            });
        }
    };
})