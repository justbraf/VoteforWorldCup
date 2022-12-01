Template.groupList.helpers({
  GroupA: function () {
    return teamsdb.find({ grpName: { $eq: "A" } }, { sort: { groupId: 1 } });
  },
  GroupB: function () {
    return teamsdb.find({ grpName: { $eq: "B" } }, { sort: { groupId: 1 } });
  },
  GroupC: function () {
    return teamsdb.find({ grpName: { $eq: "C" } }, { sort: { groupId: 1 } });
  },
  GroupD: function () {
    return teamsdb.find({ grpName: { $eq: "D" } }, { sort: { groupId: 1 } });
  },
  GroupE: function () {
    return teamsdb.find({ grpName: { $eq: "E" } }, { sort: { groupId: 1 } });
  },
  GroupF: function () {
    return teamsdb.find({ grpName: { $eq: "F" } }, { sort: { groupId: 1 } });
  },
  GroupG: function () {
    return teamsdb.find({ grpName: { $eq: "G" } }, { sort: { groupId: 1 } });
  },
  GroupH: function () {
    return teamsdb.find({ grpName: { $eq: "H" } }, { sort: { groupId: 1 } });
  },
  // showStats: function () {
  //   console.warn({ this: this })
  //   if (!!this.goalDiff || !!this.points)
  //     return true
  //   return false
  // }
});