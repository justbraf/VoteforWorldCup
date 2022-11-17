Template.allRankers.helpers({
  theRankers: function () {
    return ranksdb.find({}, { sort: { 'ranked': 1 } });
  },
  predictorsName: function () {
    return Meteor.users.findOne({ "_id": this.userID }, { fields: { "profile.name": 1 } }).profile.name;
  },
  theirPoints: function () {
    return ranksdb.findOne({ "_id": this.userID }).totalPoints;
  }
});