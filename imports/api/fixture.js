import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import date from 'date-and-time'

// Get final natches team data
getTeamData = (whichTeam) => {
  let matchWinner
  let team
  if (whichTeam[0] == "W") {
    let mId = fixturesdb.findOne({ matchNum: whichTeam })
    if (!!mId)
      matchWinner = goalsdb.find({ matchID: mId._id })
    else
      return
  }
  else {
    let mId = fixturesdb.findOne({ matchNum: "W" + whichTeam.substring(1) })
    if (!!mId)
      matchWinner = goalsdb.find({ matchID: mId._id })
    else
      return
  }
  if (matchWinner.count() > 0) {
    if (matchWinner.fetch()[0].score > matchWinner.fetch()[1].score)
      if (whichTeam[0] == "W")
        team = teamsdb.findOne({ _id: matchWinner.fetch()[0].teamID })
      else
        team = teamsdb.findOne({ _id: matchWinner.fetch()[1].teamID })
    else
      if (whichTeam[0] == "W")
        team = teamsdb.findOne({ _id: matchWinner.fetch()[1].teamID })
      else
        team = teamsdb.findOne({ _id: matchWinner.fetch()[0].teamID })
    if (!!team)
      return team
  }

}

Template.fixture.helpers({
  mode: (display) => {
    if (display == "List") {
      Session.set("displayMode", 1)
      Session.set("layout", [
        { matchDate: { $gte: Date.now() } },
        { sort: { matchDate: 1 }, limit: 0 }
      ])
    }
    else if (display == "Scores") {
      Session.set("displayMode", 0)
      Session.set("layout", [
        { matchDate: { $lt: Date.now() } },
        { sort: { matchDate: -1 } }
      ])
    }
  },
  WCMatches: function () {
    let result
    result = fixturesdb.find(Session.get("layout")[0], Session.get("layout")[1]);
    return result
  },
  teamOneName: function () {
    let team = teamsdb.findOne({ grpName: this.group, groupId: this.teamOne })
    if (!!team)
      return team.team
    let teamGroups = "ABCDEFGH"
    if (!teamGroups.includes(this.group)) {
      if (teamGroups.includes(this.teamOne[1]))
        team = teamsdb.findOne({ grpName: this.teamOne[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamOne[0] - 1) })
      if (!!team)
        return team.team
      else {
        team = getTeamData(this.teamOne)
        if (!!team)
          return team.team
      }
    }
    return false
  },
  teamTwoName: function () {
    let team = teamsdb.findOne({ grpName: this.group, groupId: this.teamTwo })
    if (!!team)
      return team.team
    let teamGroups = "ABCDEFGH"
    if (!teamGroups.includes(this.group)) {
      if (teamGroups.includes(this.teamTwo[1]))
        team = teamsdb.findOne({ grpName: this.teamTwo[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamTwo[0] - 1) })
      if (!!team)
        return team.team
      else {
        team = getTeamData(this.teamTwo)
        if (!!team)
          return team.team
      }
    }
    return false
  },
  matchDateFull: function () {
    if (this.matchDate)
      if (Session.get("displayMode"))
        return date.format(new Date(this.matchDate), 'dddd, MMMM DD YYYY')
      else
        return date.format(new Date(this.matchDate), 'D MMM YY')
    return
  },
  matchTimeFull: function () {
    if (this.matchDate)
      if (Session.get("displayMode"))
        return date.format(new Date(this.matchDate), 'h:mm A')
    return
  },
  userVoted1: function () {
    // set the color of team columns based on user's vote
    let result = votesdb.findOne({ $and: [{ matchID: this._id }, { userID: Meteor.userId() }] })
    let team
    let teamGroups = "ABCDEFGH"
    if (teamGroups.includes(this.group)) {
      team = teamsdb.findOne({ grpName: this.group, groupId: this.teamOne })
    }
    else if (teamGroups.includes(this.teamOne[1])) {
      team = teamsdb.findOne({ grpName: this.teamOne[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamOne[0] - 1) })
    }
    else
      team = getTeamData(this.teamOne)
    if (!!result && !!team) {
      if (result.teamID == team._id) {
        return 1
      }
    }
    return 0
  },
  userVoted2: function () {
    // set the color of team columns based on user's vote
    let result = votesdb.findOne({ $and: [{ matchID: this._id }, { userID: Meteor.userId() }] })
    let team
    let teamGroups = "ABCDEFGH"
    if (teamGroups.includes(this.group)) {
      team = teamsdb.findOne({ grpName: this.group, groupId: this.teamTwo })
    }
    else if (teamGroups.includes(this.teamOne[1])) {
      team = teamsdb.findOne({ grpName: this.teamTwo[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamTwo[0] - 1) })
    }
    else
      team = getTeamData(this.teamTwo)
    if (!!result && !!team) {
      if (result.teamID == team._id) {
        return 1
      }
      return 0
    }
  },
  showGoals: function () {
    if (new Date() > new Date(fixturesdb.findOne({ _id: this._id }).matchDate)) {
      return true;
    } else {
      return false;
    }
  },
  teamOneGoals: function () {
    let teamOne
    let teamGroups = "ABCDEFGH"
    if (teamGroups.includes(this.group)) {
      teamOne = teamsdb.findOne({ $and: [{ grpName: this.group }, { groupId: this.teamOne }] })
    }
    else if (teamGroups.includes(this.teamOne[1])) {
      teamOne = teamsdb.findOne({ grpName: this.teamOne[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamOne[0] - 1) })
    }
    else
      teamOne = getTeamData(this.teamOne)
    if (!!teamOne) {
      let goals = goalsdb.findOne({ $and: [{ teamID: teamOne._id }, { matchID: this._id }] })
      if (!!goals) {
        return goals.score;
      }
    }
    return "?"
  },
  teamTwoGoals: function () {
    let teamTwo
    let teamGroups = "ABCDEFGH"
    if (teamGroups.includes(this.group)) {
      teamTwo = teamsdb.findOne({ $and: [{ grpName: this.group }, { groupId: this.teamTwo }] })
    }
    else if (teamGroups.includes(this.teamTwo[1])) {
      teamTwo = teamsdb.findOne({ grpName: this.teamTwo[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamTwo[0] - 1) })
    }
    else
      teamTwo = getTeamData(this.teamTwo)
    if (!!teamTwo) {
      let goals = goalsdb.findOne({ $and: [{ teamID: teamTwo._id }, { matchID: this._id }] })
      if (!!goals) {
        return goals.score;
      }
    }
    return "?"
  }
});

Template.fixture.events({
  'click .js-matchVote': function (e) {
    let matchId = e.currentTarget.id;
    let teamData = "ABCDEFGH"
    let fixtureData = fixturesdb.findOne({ _id: matchId })
    let teamOne
    let teamTwo
    if (teamData.includes(fixtureData.group)) {
      teamData = teamsdb.find({ grpName: fixtureData.group }).fetch()
      teamOne = teamData.find(el => el.groupId == fixtureData.teamOne)
      teamTwo = teamData.find(el => el.groupId == fixtureData.teamTwo)
    }
    else {
      if (teamData.includes(fixtureData.teamOne[1])) {
        teamOne = teamsdb.findOne({ grpName: this.teamOne[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamOne[0] - 1) })
        teamTwo = teamsdb.findOne({ grpName: this.teamTwo[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (this.teamTwo[0] - 1) })
      }
      else {
        teamOne = getTeamData(this.teamOne)
        if (!teamOne) {
          alert("Predicting is currently not available.")
          return
        }
        teamTwo = getTeamData(this.teamTwo)
        if (!teamTwo) {
          alert("Predicting is currently not available.")
          return
        }
      }
    }
    let adm
    if (Meteor.user().profile && Meteor.user().profile.isAdmin)
      adm = Meteor.user().profile.isAdmin
    if (adm) {
      if (new Date() > new Date(fixtureData.matchDate)) {
        let result = goalsdb.find({ 'matchID': matchId });
        if (result.count() > 0) {
          result.forEach(function (goalDocs) {
            if (goalDocs.teamID == teamOne._id) {
              Number($('#teamGoals1').val(goalDocs.score));
            }
            if (goalDocs.teamID == teamTwo._id) {
              Number($('#teamGoals2').val(goalDocs.score));
            }
          });
        }
        $('#setGoalsModal input[name="matchID"]').val(matchId);
        $('#sgteamFlag1').attr("src", teamOne.team + ".png")
        $('#sgteamFlag1').attr("alt", "Flag of " + teamOne.team)
        $('#sgteamFlag2').attr("src", teamTwo.team + ".png")
        $('#sgteamFlag2').attr("alt", "Flag of " + teamTwo.team)
        $('#sgteamName1').html(teamOne.team)
        $('#sgteamName2').html(teamTwo.team)
        $('#setGoalsModal').modal('show');
      }
    }
    else {
      if (new Date() < new Date(fixtureData.matchDate)) {
        $('#voteModal input[name="matchID"]').val(matchId);
        $('#voteModal #teamName1Vote').attr("data-id", teamOne._id);
        $('#voteModal #teamName2Vote').attr("data-id", teamTwo._id);
        // $('#voteModal input[name="matchnum"]').val(teamData.matchNum);
        $('#teamFlag1').attr("src", "../" + teamOne.team + ".png");
        $('#teamFlag1').attr("alt", "Flag of " + teamOne.team);
        $('#teamFlag2').attr("src", "../" + teamTwo.team + ".png");
        $('#teamFlag2').attr("alt", "Flag of " + teamTwo.team);
        $('#teamName1Show').html(teamOne.team);
        $('#teamName2Show').html(teamTwo.team);
        $('#voteModal').modal('show');
      } else {
        alert("Predicting for this match is closed.");
      }
    }
  }
});