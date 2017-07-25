import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-component';
import uiRouter from 'angular-ui-router';

import { Tasks } from '../../api/tasks.js';

import template from './taskForm.html';

class TaskFormCtrl {
  constructor($scope, $state, $stateParams) {
    $scope.viewModel(this);

    $('#prev-date').datepicker();

    this.state = $state;
    this.checklistId = $stateParams.checklistId;
    this.taskId      = $stateParams.taskId;

    this.task = Tasks.findOne({_id: this.taskId});
  }

  updateTask() {
    Meteor.call('tasks.update', this.task);
    this.state.go('checklistDetail', {checklistId: this.checklistId});
  }
}

export default angular.module('taskForm', [
  angularMeteor,
  uiRouter
])
  .component('taskForm', {
    templateUrl: 'imports/components/taskForm/taskForm.html',
    controller: ['$scope', '$state', '$stateParams', TaskFormCtrl]
  });
