import angular from 'angular';
import uiRouter from 'angular-ui-router';

var modulo = angular.module('teste', [
  uiRouter
]).config(function($stateProvider) {
  $stateProvider.state({
    name: 'about',
    url: '/about',
    template: '<h3>SOBRE!!!</h3>'
  });
  $stateProvider.state({
    name: 'config',
    url: '/config',
    template: '<h2>CONFIGS!!!</h2>'
  });
});
