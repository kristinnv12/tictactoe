'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('play', {
        url: '/play',
        templateUrl: 'app/playGame/playGame.html',
        controller: 'PlayGameController'
      });
  });