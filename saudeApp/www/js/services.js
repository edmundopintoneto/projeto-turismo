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
            this.getQuery(queryName).then(function(txt){
                var params = angular.extend({}, PARAMS, {
                    query: format(txt, params)
                });

                $http.jsonp(URL, {params: params}).then(function(result) {
                    q.resolve(result.data.results);
                });
            });

            return q.promise;
        };


    });

})(angular);