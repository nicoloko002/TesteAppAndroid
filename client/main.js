import angular from 'angular';
import uiRouter from 'angular-ui-router';

import checklistList from '../imports/components/checklistList/checklistList'
import checklistDetail from '../imports/components/checklistDetail/checklistDetail'
import checklistForm from '../imports/components/checklistForm/checklistForm'

import { Checklists } from '../imports/api/checklists.js';

angular.module('checkListApp', [
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
        url: '/checklistForm/{checklistId}',
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
