import angular from 'angular';
import uiRouter from 'angular-ui-router';

import checklistList from '../imports/components/checklistList/checklistList'
import checklistForm from '../imports/components/checklistForm/checklistForm'

angular.module('app-teste', [
  uiRouter,
  checklistList.name,
  checklistForm.name
])
  .config(function($urlServiceProvider, $stateProvider) {
    $stateProvider
      .state({
        name: 'checklistList',
        url: '/checklistList',
        template: '<checklist-list></checklist-list>'
      })
      .state({
        name: 'checklistForm',
        url: '/checklistForm',
        template: '<checklist-form></checklist-form>'
      });

    $urlServiceProvider.rules.otherwise({
      state: 'checklistList'
    });
  });
