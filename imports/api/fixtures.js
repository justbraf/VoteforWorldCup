import date from 'date-and-time';

let userAdmID = 'dzLsoejG8sQWPrrG6';

Template.fixtures.helpers({
  WCMatches: function () {
    // return fixturesdb.find({}, { sort: { matchDate: 1 }, limit: (Number(VFWCdb.findOne({}).matchesAvailable) - (goalsdb.find().count() / 2)), skip: (goalsdb.find().count() / 2) });
    return fixturesdb.find({}, { sort: { matchDate: 1 } });
    // return fixturesdb.find({}, {orderby:{matchNum:1}});
  },
  teamOneName: function () {
    return teamsdb.findOne({ grpName: this.group, groupId: this.teamOne }).team;
  },
  teamTwoName: function () {
    return teamsdb.findOne({ grpName: this.group, groupId: this.teamTwo }).team;
  },
  matchDateFull: function () {
    return date.format(new Date(fixturesdb.findOne({ _id: this._id }).matchDate), 'dddd, MMMM DD YYYY');
  },
  matchTimeFull: function () {
    return date.format(new Date(fixturesdb.findOne({ _id: this._id }).matchDate), 'h:mm A');
  },
  userVoted1: function () {
    // set the color of team columns based on user's vote
    let result = votesdb.find({ $and: [{ matchID: this._id }, { userID: Meteor.userId() }] });
    if (result.count() > 0) {
      if (result.fetch()[0].teamID == this.teamOne) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  userVoted2: function () {
    // set the color of team columns based on user's vote
    let result = votesdb.find({ $and: [{ matchID: this._id }, { userID: Meteor.userId() }] });
    if (result.count() > 0) {
      if (result.fetch()[0].teamID == this.teamTwo) {
        return 1;
      } else {
        return 0;
      }
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
    let goals = goalsdb.find({ $and: [{ teamID: this.teamOne }, { matchID: this._id }] });
    if (goals.count() > 0) {
      return goals.fetch()[0].score;
    }
  },
  teamTwoGoals: function () {
    let goals = goalsdb.find({ $and: [{ teamID: this.teamTwo }, { matchID: this._id }] });
    if (goals.count() > 0) {
      return goals.fetch()[0].score;
    }
  }
});

Template.fixtures.events({
  'click .js-matchVote': function (e) {
    let matchId = e.currentTarget.id;
    let teamData = "ABCDEFGH"
    let fixtureData = fixturesdb.findOne({ _id: matchId });
    if (teamData.includes(fixtureData.group)) {
      teamData = teamsdb.find({ grpName: fixtureData.group }).fetch()
    }
    let teamOne = teamData.find(el => el.groupId == fixtureData.teamOne).team
    let teamTwo = teamData.find(el => el.groupId == fixtureData.teamTwo).team
    // console.table(teamData)
    if (Meteor.userId() == userAdmID) {
      let result = goalsdb.find({ 'matchID': matchId });
      if (result.count() > 0) {
        result.forEach(function (goalDocs) {
          if (goalDocs.teamID == teamData.teamOne) {
            Number($('#teamGoals1').val(goalDocs.score));
          }
          if (goalDocs.teamID == teamData.teamTwo) {
            Number($('#teamGoals2').val(goalDocs.score));
          }
        });
      }
      $('#setGoalsModal input[name="matchID"]').val(matchId);
      $('#sgteamFlag1').attr("src", teamsdb.findOne({ _id: teamData.teamOne }).teamFlag);
      $('#sgteamFlag1').attr("alt", "Flag of " + teamsdb.findOne({ _id: teamData.teamOne }).teamName);
      $('#sgteamFlag2').attr("src", teamsdb.findOne({ _id: teamData.teamTwo }).teamFlag);
      $('#sgteamFlag2').attr("alt", "Flag of " + teamsdb.findOne({ _id: teamData.teamTwo }).teamName);
      $('#sgteamName1').html(teamsdb.findOne({ _id: teamData.teamOne }).teamName);
      $('#sgteamName2').html(teamsdb.findOne({ _id: teamData.teamTwo }).teamName);
      $('#setGoalsModal').modal('show');
    } else {
      if (new Date() < new Date(fixtureData.matchDate)) {
        $('#voteModal input[name="matchID"]').val(matchId);
        $('#voteModal #teamName1Vote').attr("data-id", teamOne);
        $('#voteModal #teamName2Vote').attr("data-id", teamTwo);
        // $('#voteModal input[name="matchnum"]').val(teamData.matchNum);
        $('#teamFlag1').attr("src", "../" + teamOne + ".png");
        $('#teamFlag1').attr("alt", "Flag of " + teamOne);
        $('#teamFlag2').attr("src", "../" + teamTwo + ".png");
        $('#teamFlag2').attr("alt", "Flag of " + teamTwo);
        $('#teamName1Show').html(teamOne);
        $('#teamName2Show').html(teamTwo);
        $('#voteModal').modal('show');
      } else {
        alert("Predicting for this match is closed.");
      }
    }
  }
});