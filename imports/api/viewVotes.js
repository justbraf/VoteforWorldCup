import { Template } from 'meteor/templating';

Template.viewVotes.helpers({
  allVotes: () => {
    return votesdb.find({}, { sort: { matchID: 1, teamID: 1, userID: 1 } })
  },
  totalVotes: () => {
    return votesdb.find().count()
  },
  teamName: (tId) => {
    return teamsdb.findOne({ _id: tId }).team
  }
})

Template.viewVotes.events({
  'dblclick .js-delVote': (e) => {
    Meteor.call("delVote", e.currentTarget.id)
  }
})