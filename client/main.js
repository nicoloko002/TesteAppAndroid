import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { Checklists } from '../imports/api/checklists.js';

import checklistList from '../imports/components/checklistList/checklistList'
import checklistDetail from '../imports/components/checklistDetail/checklistDetail'
import checklistForm from '../imports/components/checklistForm/checklistForm'

angular.module('app-teste', [
  uiRouter,
  checklistList.name,
  checklistDetail.name,
  checklistForm.name
]).config(function($urlServiceProvider, $stateProvider) {
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
      })
      .state({
        name: 'checklistDetail',
        url: '/checklist/{checklistId}',
        template: '<checklist-detail></checklist-detail>'
      });

    $urlServiceProvider.rules.otherwise({
      state: 'checklistList'
    });
  });
