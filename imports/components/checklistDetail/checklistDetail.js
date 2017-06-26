import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-component';
import { Meteor } from 'meteor/meteor';

import { Checklists } from '../../api/checklists.js';
import { Tasks } from '../../api/tasks.js'

import template from './checklistDetail.html';

class checklistDetail {
  constructor($scope, $stateParams, $reactive) {
    $scope.viewModel(this);
    $reactive(this).attach($scope);
    this.subscribe('tasks');

    this.sortings = [{
      id: 0,
      label: 'Data de Criação',
      field: 'createdAt'
    }, {
      id: 1,
      label: 'Data de Finalização',
      field: 'finalizedAt'
    }];
    this.sorting      = this.sortings[0];
    this.checklistId  = $stateParams.checklistId;
    this.creationDate = null;

    this.helpers({
      checklist() {
        let list =  Checklists.findOne({
          _id: $stateParams.checklistId
        });

        if (list != null)
          this.creationDate = list.createdAt.getDate() + '/' + list.createdAt.getMonth() + '/' + list.createdAt.getFullYear();

        return list;
      },
      tasks() {
        let sortingFields = {};
        sortingFields[this.getReactively('sorting').field] = -1;

        return Tasks.find({
          checklistId: $stateParams.checklistId
        }, {
          sort: sortingFields
        });
      }
    });
  }

  addTask() {
    Meteor.call('tasks.insert', this.checklistId, this.newTask);

    this.newTask = '';
  }

  removeTask(task) {
    if (window.confirm('Deseja realmente excluir esta tarefa?'))
      Meteor.call('tasks.remove', task._id);
  }

  setChecked(task) {
    let date;

    if (task.checked)
      date = null
    else
      date = new Date();

    Meteor.call('tasks.setChecked', task._id, date, !task.checked);
  }
}

export default angular.module('checklistDetail', [
  angularMeteor
])
  .component('checklistDetail', {
    templateUrl: 'imports/components/checklistDetail/checklistDetail.html',
    controller: ['$scope', '$stateParams', '$reactive', checklistDetail]
  });
