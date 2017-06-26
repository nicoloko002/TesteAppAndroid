import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Checklists = new Mongo.Collection('checklists');

Meteor.methods({
  'checklist.insert' (text) {
    check(text, String);

    Checklists.insert({
      text: text,
      createdAt: new Date()
    });
  },
  'checklist.remove' (checklistId) {
    check(checklistId, String);

    Checklists.remove(checklistId);
  }
});

if (Meteor.isCordova) {
  Ground.Collection(Checklists);
}
