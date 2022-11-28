import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Session.set("sort", "match")
Template.viewVotes.helpers({
  allVotes: () => {
    if (Session.get("sort") == "team")
      return votesdb.find({}, { sort: { teamID: 1, matchID: 1 } })
    else if (Session.get("sort") == "user")
      return votesdb.find({}, { sort: { userID: 1, matchID: 1 } })
    return votesdb.find({}, { sort: { matchID: 1, teamID: 1 } })
  },
  totalVotes: () => {
    return votesdb.find().count()
  },
  teamName: function () {
    let team = teamsdb.findOne({ _id: this.teamID })
    if (!!team)
      return team.team
    return ""
  },
  username: function () {
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
  },
  matchData: function () {
    let fixture = fixturesdb.findOne({ _id: this.matchID })
    if (!!fixture) {
      let teamOne = teamsdb.findOne({ grpName: fixture.group, groupId: fixture.teamOne })
      if (!!teamOne) {
        let teamTwo = teamsdb.findOne({ grpName: fixture.group, groupId: fixture.teamTwo })
        if (!!teamTwo) {
          let goalsOne = goalsdb.findOne({ matchID: this.matchID, teamID: teamOne._id })
          let goalsTwo = goalsdb.findOne({ matchID: this.matchID, teamID: teamTwo._id })
          if (!goalsOne)
            goalsOne = -1
          else
            goalsOne = goalsOne.score
          if (!goalsTwo)
            goalsTwo = -1
          else
            goalsTwo = goalsTwo.score
          if (Date.now() > fixture.matchDate) {
            fixture = "played"
            if (goalsOne < 0) {
              goalsOne = "?"
              goalsTwo = "?"
            }
          }
          else
            fixture = ""
          if (!!teamOne && !!teamTwo)
            if (goalsOne == -1)
              return `${teamOne.team} vs ${teamTwo.team} ${fixture}`
            else
              return `${teamOne.team}: ${goalsOne} vs ${teamTwo.team}: ${goalsTwo} ${fixture}`
        }
      }
    }
    return ""
  }
})

Template.viewVotes.events({
  'dblclick .js-delVote': (e) => {
    Meteor.call("delVote", e.currentTarget.id)
  },
  'click .js-byMatch': () => {
    Session.set("sort", "match")
  },
  'click .js-byUser': () => {
    Session.set("sort", "user")
  },
  'click .js-byTeam': () => {
    Session.set("sort", "team")
  }
})