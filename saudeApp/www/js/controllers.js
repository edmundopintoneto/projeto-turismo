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

        $scope.results = [];

        Sparql.execute('diseases').then(function(data) {
            $ionicLoading.hide().then(function() {
                $scope.results = data.bindings;
            });
        });
    });

})(angular);