(function(angular) {

    var DEFAULT_LANGAUGE = 'pt';

    var app = angular.module('saude');

    app.controller('HomeController', function($scope, $state, LANGUAGES) {
        $scope.LANGUAGES = LANGUAGES;
        $scope.data = {
            lang: DEFAULT_LANGAUGE,
            q: ""
        };

        $scope.doSearch = function() {
            $state.go('search-result', $scope.data);
        };
    });

    /**
     * Search result
     */
    app.controller('SearchResultController', function($scope, $stateParams, $ionicLoading, Sparql) {
        $ionicLoading.show({template: "Buscando..."});

        $scope.results = null;
        $scope.lang = $stateParams.lang || DEFAULT_LANGAUGE;


        var params = {lang: $stateParams.lang};
        params.q = {
            txt: "lcase(str(?qualquervalor)) like lcase('%{0}%')",
            values: [],
            joiner: ' && '
        };			
		
        params.q.values = $stateParams.q.split(',').map(function(item){ return item.trim(); });

		Sparql.execute('diseases', params).then(function(data) {
            $ionicLoading.hide().then(function() {
                $scope.results = data.bindings;
            });
        }, function(err) {
            $ionicLoading.show({tempalte: "Error. Recarregue"});
        });
    });

    /**
     * Disease detail page
     */
    app.controller('DiseaseController', function($scope, disease) {
        $scope.disease = disease.bindings[0];
    });

})(angular);