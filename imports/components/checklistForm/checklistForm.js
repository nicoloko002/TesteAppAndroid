import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-component';
import uiRouter from 'angular-ui-router';

import { Checklists } from '../../api/checklists.js';

import template from './checklistForm.html';

class ChecklistFormCtrl {
  constructor($scope, $state) {
    $scope.viewModel(this);

    this.state = $state;
  }

  addCheckList(newChecklist) {
    Checklists.insert({
      text: newChecklist,
      createdAt: new Date
    });

    this.state.go('checklistList');
  }
}

export default angular.module('checklistForm', [
  angularMeteor,
  uiRouter
])
  .component('checklistForm', {
    templateUrl: 'imports/components/checklistForm/checklistForm.html',
    controller: ['$scope', '$state', ChecklistFormCtrl]
  });
