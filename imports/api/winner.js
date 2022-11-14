Template.winner.helpers({
  legend: function () {
    legendID = ranksdb.findOne({ "ranked": 1 }).userID;
    return Meteor.users.findOne({ "_id": legendID }, { fields: { "profile.name": 1 } }).profile.name;
  }
});