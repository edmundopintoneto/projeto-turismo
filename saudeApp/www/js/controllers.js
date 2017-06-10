(function(angular) {

    var app = angular.module('saude');

    app.controller('HomeController', function($scope, $state) {
        $scope.q = "";

        $scope.doSearch = function(q) {
            $state.go('search-result', {q: q});
        };
    });

    /**
     * Search result
     */
    app.controller('SearchResultController', function($scope, $stateParams, $ionicLoading, Sparql) {
        $ionicLoading.show({template: "Buscando..."});

        $scope.results = null;
		

		//splitar q por ,
		//Para cada termo montar lcase(?Descricao) like lcase('%termo1%') && lcase(?Descricao) like lcase('%termo1%')
		//splitar q por ,
		//Para cada termo montar lcase(?Descricao) like lcase('%termo1%') && lcase(?Descricao) like lcase('%termo1%')
		//$str= "''%" + $stateParams.q + "%''";
		
		Sparql.execute('diseases', {name: $stateParams.q}).then(function(data) {
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