import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks } from './tasks.js';

export const Checklists = new Mongo.Collection('checklists');

Meteor.methods({
  'checklists.insert' (text) {
    check(text, String);

    Checklists.insert({
      text: text,
      createdAt: new Date(),
      closedAt: null,
      closed: false
    });
  },
  'checklists.remove' (checklistId) {
    check(checklistId, String);

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
