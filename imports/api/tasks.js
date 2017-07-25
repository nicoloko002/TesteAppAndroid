import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// export const Tasks = new Mongo.Collection('tasks');
export const Tasks = new Ground.Collection('tasks');

// if (Meteor.isCordova) {
// }

Meteor.methods({
  'tasks.insert' (checklistId, text) {
    check(checklistId, String);
    check(text, String);

    Tasks.insert({
      checklistId: checklistId,
      createdAt: new Date(),
      finalizedAt: null,
      prevDate: null,
      checked: false,
      text: text
    });
  },
  'tasks.update' (task) {
    check(task.text, String);

    Tasks.update({_id: task._id}, {
      $set: {
          text: task.text,
          prevDate: task.prevDate
      }
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
