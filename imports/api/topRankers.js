import { Template } from 'meteor/templating'

Template.topRankers.helpers({
  theRankers: function () {
    return ranksdb.find({}, { sort: { 'ranked': 1 }, limit: 3 });
  },
  predictorsName: function () {
    let userData = "Anonymous"
    let result = Meteor.users.findOne({ "_id": this.userID })
    if (!!result) {
      if (!!result.profile && !!result.profile.name) {
        userData = result.profile.name
      }
      else if (!!result.username) {
        userData = result.username
      }
      else if (!!result.emails) {
        userData = result.emails[0].address
      }
    }
    return userData
  }
});