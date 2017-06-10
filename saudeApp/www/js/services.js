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
					
					//var str = txt;
					
					//alert(txt);
					
                    query: that.format(txt, params)
					//query: "PREFIX dbpediaO: <http://dbpedia.org/ontology/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n\r\nselect distinct ?Entity ?Nome  where {\r\n    ?Entity a dbo:Disease.\r\n\t?Entity rdfs:label ?Nome.\r\n\t?Entity dbo:abstract ?Descricao.\r\n\tFILTER (lang(?Nome) = 'pt')\r\n\tFILTER (lang(?Descricao) = 'pt')\r\n\tFILTER (lcase(?Descricao) like lcase('%febre%'))\r\n} LIMIT 100"
					
                });

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