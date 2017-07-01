import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks } from './tasks.js';

export const Checklists = new Mongo.Collection('checklists');

Meteor.methods({
  'checklists.insert' (checklist) {
    check(checklist.text, String);

    return Checklists.insert({
      text: checklist.text,
      createdAt: new Date(),
      closedAt: null,
      closed: false
    });
  },
  'checklists.update' (checklist) {
    check(checklist.text, String);

    Checklists.update({_id: checklist._id}, {
      $set: {
        text: checklist.text
      }
    });
  },
  'checklists.duplicate' (checklist) {
    let newChecklistId = Checklists.insert({
      text: checklist.text,
      createdAt: new Date(),
      closedAt: null,
      closed: false
    });

    let tasks = Tasks.find({checklistId: checklist._id});

    tasks.forEach(function(task) {
      Meteor.call('tasks.insert', newChecklistId, task.text);
    });
  },
  'checklists.remove' (checklistId) {
    check(checklistId, String);

    Tasks.remove({checklistId: checklistId});
    Checklists.remove(checklistId);
  },
  'checklists.changeStatus' (checklistId) {
    check(checklistId, String);

    if (Tasks.find({
      checklistId: checklistId,
      checked: false
    }).count() > 0)
      Checklists.update({ _id: checklistId }, {
        $set: {
          closedAt: null,
          closed: false
        }
      });
    else
      Checklists.update({ _id: checklistId }, {
        $set: {
          closedAt: new Date(),
          closed: true
        }
      });
  }
});

if (Meteor.isCordova) {
  Ground.Collection(Checklists);
}
