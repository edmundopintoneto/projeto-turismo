// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('timesApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('leagues', {
        url: '/',
        templateUrl: 'templates/leagues.html',
        controller: 'LeaguesController',
        resolve: {
            leagues: function(Times) {
                return Times.getLeagues();
            }
        }
    });

    $stateProvider.state('teams', {
        url: '/times/:leagueName',
        templateUrl: 'templates/teams.html',
        controller: 'TeamsController',
        resolve: {
            teams: function(Times, $stateParams) {
                return Times.getTeams($stateParams.leagueName);
            }
        }
    });

    $stateProvider.state('team', {
        url: '/times/:leagueName/:teamName',
        templateUrl: 'templates/team.html',
        controller: 'TeamController',
        resolve: {
            team: function(Times, $stateParams, $q) {
                var q = $q.defer();

                Times.getTeam($stateParams.leagueName, $stateParams.teamName).then(data => {
                    q.resolve(data);
                }, err => {
                    q.reject(err);
                });

                return q.promise;
            }
        }
    });

    $urlRouterProvider.otherwise('/');
});