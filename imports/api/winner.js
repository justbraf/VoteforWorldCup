import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

Session.set("legend", "")

Template.winner.helpers({
  legend: function () {
    let legendID = ranksdb.findOne({ "ranked": 1 }).userID;
    Meteor.call('legendUser', legendID, (error, result) => {
      if (!!error) {
        console.error(error)
        return
      }
      Session.set("legend", result)
    })
    return Session.get("legend")
  }
});