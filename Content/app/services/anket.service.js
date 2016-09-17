angular.module('app')
    .factory('anketService', ['$http', 'URLS', 'authService',
        function ($http, URLS, authService) {
            return {
                send: function (name, anket) {

                    var url = URLS.API.BASE + 'anket/' + name;

                    // anket without files are sended as json
                    if (!anket.Files)
                        return $http.post(url, anket);

                    // create new FormData
                    var formdata = new FormData();

                    // append files to FormData
                    if (anket.Files && typeof (anket.Files) == 'object') {
                        // list all Files keys (names of the fields)
                        for (var key in anket.Files) {
                            // get anket file by key
                            var anketFile = anket.Files[key];
                            // add anket file to Form Data
                            if(anketFile)
                                formdata.append('file' + key, anketFile);
                        }
                    }

                    // append anket (witout files) as json to FormData
                    formdata.append('anket', JSON.stringify(anket, function (key, value) {
                        if (key.toLowerCase() == 'files')
                            return undefined;
                        return value;
                    }));

                    // set FormData to url
                    return $http.post(URLS.API.BASE + 'ankets/' + name, formdata, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    });
                }
            };
        }]);