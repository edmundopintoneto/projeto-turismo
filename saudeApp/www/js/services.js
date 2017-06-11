(function(angular) {

    var app = angular.module('saude');


    app.service('Sparql', function($http, $q, $sce) {

        var PARAMS = {"default-graph-uri": "http://dbpedia.org", "output": "json", "callback": "JSON_CALLBACK"};
        var URL = "http://dbpedia.org/sparql";

        this.getQuery = function(queryName) {
            var q = $q.defer();

            $http.get('queries/' + queryName + '.rq').then(function(result){
                q.resolve(result.data);
            });

            return q.promise;
        };

        this.execute = function(queryName, params) {
            var q = $q.defer();
            var that = this;
            this.getQuery(queryName).then(function(txt) {

                var data = angular.extend({}, PARAMS, {
                    query: that.format(txt, params)
                });

                console.log(data.query);

                $http.jsonp(URL, {params: data}).then(function(result) {
                    q.resolve(result.data.results);
                }, function(err) {
                    q.reject(err);
                });
            });

            return q.promise;
        };

        this.format = function(txt, params) {
            Object.keys(params).forEach(function(key) {
                params[key] = params[key].replace(/\'/gi, "\\'");
            });

            return format(txt, params);
        };


    });

})(angular);