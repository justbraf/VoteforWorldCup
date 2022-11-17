Template.topRankers.helpers({
  theRankers: function () {
    return ranksdb.find({}, { sort: { 'ranked': 1 }, limit: 5 });
  },
  predictorsName: function () {
    return Meteor.users.findOne({ "_id": this.userID }, { fields: { "profile.name": 1 } }).profile.name;
  }
});