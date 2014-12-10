'use strict';

angular.module('tictactoeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    //this code is taken almost purly from teacher
    $locationProvider.html5Mode(true);
    }).value('idgen', function(){
      function token(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return token() + token() + '-' + token() + '-' + token() + '-' + 
             token() + '-' + token() + token() + token();
    });