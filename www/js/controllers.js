(function(angular) {

    var app = angular.module('timesApp');

    app.controller('LeaguesController', function($scope, $stateParams, leagues) {
		
		 // declare a controller function that delegates to your service to save the recipe
      $scope.submitPesquisa = function(termo) {
		
		Alert(termo.termobusca);
		
		$scope.leagues = leagues.data.results.bindings;
		
	 }      
	  
    });

    app.controller('TeamsController', function($scope, $stateParams, teams) {
        $scope.leagueName = $stateParams.leagueName;
        $scope.teams = teams.data.results.bindings;
    });

    app.controller('TeamController', function($scope, $stateParams, team) {
        $scope.team = team.data.results.bindings[0];
    });

})(angular);