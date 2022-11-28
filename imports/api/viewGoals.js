import { Template } from 'meteor/templating'

Template.viewGoals.helpers({
  goals: () => {
    return goalsdb.find()
  },
  played: () => {
    return fixturesdb.find({ matchDate: { $lt: Date.now() } }).count()
  },
  goalsSet: () => {
    return goalsdb.find().count() / 2
  },
  matchData: function () {
    let fixture = fixturesdb.findOne({ _id: this.matchID })
    if (!!fixture) {
      let teamOne = teamsdb.findOne({ grpName: fixture.group, groupId: fixture.teamOne })
      let teamTwo = teamsdb.findOne({ grpName: fixture.group, groupId: fixture.teamTwo })
      if (!!teamOne && !!teamTwo)
        return `${teamOne.team} vs ${teamTwo.team}`
    }
    return ""
  },
  teamName: function () {
    let team = teamsdb.findOne({ _id: this.teamID })
    if (!!team)
      return team.team
    return ""
  },
})