import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-component';
import uiRouter from 'angular-ui-router';

import { Checklists } from '../../api/checklists.js';

import template from './checklistForm.html';

class ChecklistFormCtrl {
  constructor($scope, $state, $stateParams) {
    $scope.viewModel(this);

    this.state = $state;
    this.checklistId = $stateParams.checklistId;

    if (this.checklistId === 'new')
      this.checklist = {};
    else
      this.checklist = Checklists.findOne({_id: $stateParams.checklistId});
  }

  addCheckList() {
    if (this.checklistId === 'new') {
      let checklistIda;

      Meteor.call('checklists.insert', this.checklist, function(err, id) {
        checklistIda = id;
      });
      this.state.go('checklistDetail', {checklistId: checklistIda});
    } else {
      Meteor.call('checklists.update', this.checklist);
      this.state.go('checklistList');
    }
  }
}

export default angular.module('checklistForm', [
  angularMeteor,
  uiRouter
])
  .component('checklistForm', {
    templateUrl: 'imports/components/checklistForm/checklistForm.html',
    controller: ['$scope', '$state', '$stateParams', ChecklistFormCtrl]
  });
