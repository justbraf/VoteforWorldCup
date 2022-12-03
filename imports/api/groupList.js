import { Template } from 'meteor/templating'

Template.groupList.helpers({
  GroupA: function () {
    return teamsdb.find({ grpName: { $eq: "A" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1 */ } });
  },
  GroupB: function () {
    return teamsdb.find({ grpName: { $eq: "B" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  GroupC: function () {
    return teamsdb.find({ grpName: { $eq: "C" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  GroupD: function () {
    return teamsdb.find({ grpName: { $eq: "D" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  GroupE: function () {
    return teamsdb.find({ grpName: { $eq: "E" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  GroupF: function () {
    return teamsdb.find({ grpName: { $eq: "F" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  GroupG: function () {
    return teamsdb.find({ grpName: { $eq: "G" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  GroupH: function () {
    return teamsdb.find({ grpName: { $eq: "H" } }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 /* groupId: 1*/ } });
  },
  // showStats: function () {
  //   console.warn({ this: this })
  //   if (!!this.goalDiff || !!this.points)
  //     return true
  //   return false
  // }
});