import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import date from 'date-and-time'

Template.fixture.helpers({
  mode: (display) => {
    if (display == "List")
      Session.set("layout", "List")
    else if (display == "Scores")
      Session.set("layout", "Scores")
  },
  WCMatches: function () {
    // return fixturesdb.find({}, { sort: { matchDate: 1 }, limit: (Number(VFWCdb.findOne({}).matchesAvailable) - (goalsdb.find().count() / 2)), skip: (goalsdb.find().count() / 2) });
    let result
    if (Session.get("layout") == "Scores")
      result = fixturesdb.find({ matchDate: { $lt: Date.now() } }, { sort: { matchDate: -1 } });
    else
      result = fixturesdb.find({ matchDate: { $gte: Date.now() } }, { sort: { matchDate: 1 } });

    return result
  },
  teamOneName: function () {
    if (teamsdb.findOne({ grpName: this.group, groupId: this.teamOne }))
      return teamsdb.findOne({ grpName: this.group, groupId: this.teamOne }).team
    return
  },
  teamTwoName: function () {
    if (teamsdb.findOne({ grpName: this.group, groupId: this.teamTwo }))
      return teamsdb.findOne({ grpName: this.group, groupId: this.teamTwo }).team
    return
  },
  matchDateFull: function () {
    if (this.matchDate)
      return date.format(new Date(this.matchDate), 'dddd, MMMM DD YYYY')
    return
  },
  matchTimeFull: function () {
    if (this.matchDate)
      return date.format(new Date(this.matchDate), 'h:mm A')
    return
  },
  userVoted1: function () {
    // set the color of team columns based on user's vote
    let result = votesdb.find({ $and: [{ matchID: this._id }, { userID: Meteor.userId() }] });
    if (result.count() > 0) {
      if (result.fetch()[0].teamID == teamsdb.findOne({ grpName: this.group, groupId: this.teamOne })._id) {
        return 1;
      }
      return 0;
    }
  },
  userVoted2: function () {
    // set the color of team columns based on user's vote
    let result = votesdb.find({ $and: [{ matchID: this._id }, { userID: Meteor.userId() }] });
    if (result.count() > 0) {
      if (result.fetch()[0].teamID == teamsdb.findOne({ grpName: this.group, groupId: this.teamTwo })._id) {
        return 1;
      }
      return 0;
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
    let teamOne = teamsdb.findOne({ $and: [{ grpName: this.group }, { groupId: this.teamOne }] })
    if (teamOne) {
      let goals = goalsdb.find({ $and: [{ teamID: teamOne._id }, { matchID: this._id }] });
      if (goals.count() > 0) {
        return goals.fetch()[0].score;
      }
    }
    return "?"
  },
  teamTwoGoals: function () {
    let teamTwo = teamsdb.findOne({ $and: [{ grpName: this.group }, { groupId: this.teamTwo }] })
    if (teamTwo) {
      let goals = goalsdb.find({ $and: [{ teamID: teamTwo._id }, { matchID: this._id }] });
      if (goals.count() > 0) {
        return goals.fetch()[0].score;
      }
      return "?"
    }
  }
});

Template.fixture.events({
  'click .js-matchVote': function (e) {
    let matchId = e.currentTarget.id;
    let teamData = "ABCDEFGH"
    let fixtureData = fixturesdb.findOne({ _id: matchId });
    if (teamData.includes(fixtureData.group)) {
      teamData = teamsdb.find({ grpName: fixtureData.group }).fetch()
    }
    let teamOne = teamData.find(el => el.groupId == fixtureData.teamOne)
    let teamTwo = teamData.find(el => el.groupId == fixtureData.teamTwo)
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