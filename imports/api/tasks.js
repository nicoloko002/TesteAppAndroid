import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert' (checklistId, text) {
    check(checklistId, String);
    check(text, String);

    Tasks.insert({
      checklistId: checklistId,
      createdAt: new Date(),
      finalizedAt: null,
      checked: false,
      text: text
    });
  },
  'tasks.remove' (taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, date, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, {
      $set: {
        finalizedAt: date,
        checked: setChecked
      }
    });
  }
});

if (Meteor.isCordova) {
  Ground.Collection(Tasks);
}
