import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-component';

import { Checklists } from '../../api/checklists.js';

import template from './checklistList.html';

class ChecklistListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      checklists() {
        return Checklists.find({});
      }
    })
  }

  removeChecklist(checklist) {
    Meteor.call('checklist.remove', checklist._id);
  }
}

export default angular.module('checklistList', [
  angularMeteor
])
  .component('checklistList', {
    templateUrl: 'imports/components/checklistList/checklistList.html',
    controller: ['$scope', ChecklistListCtrl]
  });
