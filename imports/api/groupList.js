Template.groupList.helpers({
  GroupA: function () {
    return teamsdb.find({ grpName: { $eq: "A" } }, { sort: { team: 1 } });
  },
  GroupB: function () {
    return teamsdb.find({ grpName: { $eq: "B" } }, { sort: { team: 1 } });
  },
  GroupC: function () {
    return teamsdb.find({ grpName: { $eq: "C" } }, { sort: { team: 1 } });
  },
  GroupD: function () {
    return teamsdb.find({ grpName: { $eq: "D" } }, { sort: { team: 1 } });
  },
  GroupE: function () {
    return teamsdb.find({ grpName: { $eq: "E" } }, { sort: { team: 1 } });
  },
  GroupF: function () {
    return teamsdb.find({ grpName: { $eq: "F" } }, { sort: { team: 1 } });
  },
  GroupG: function () {
    return teamsdb.find({ grpName: { $eq: "G" } }, { sort: { team: 1 } });
  },
  GroupH: function () {
    return teamsdb.find({ grpName: { $eq: "H" } }, { sort: { team: 1 } });
  }
});