import { Template } from 'meteor/templating';
// import "./predictors.js"

Template.setGoals.events({
  'click .js-setGoals': function () {
    let mId = $('#setGoalsModal input[name="matchID"]').val();
    let tg1 = Number($('#teamGoals1').val());
    let tg2 = Number($('#teamGoals2').val());
    let teamData = "ABCDEFGH"
    let fixtureData = fixturesdb.findOne({ _id: mId });
    let teamOne
    let teamTwo
    if (teamData.includes(fixtureData.group)) {
      teamData = teamsdb.find({ grpName: fixtureData.group }).fetch()
      teamOne = teamData.find(el => el.groupId == fixtureData.teamOne)
      teamTwo = teamData.find(el => el.groupId == fixtureData.teamTwo)
    }
    else {
      if (teamData.includes(fixtureData.teamOne[1])) {
        teamOne = teamsdb.findOne({ grpName: fixtureData.teamOne[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (fixtureData.teamOne[0] - 1) })
        teamTwo = teamsdb.findOne({ grpName: fixtureData.teamTwo[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (fixtureData.teamTwo[0] - 1) })
      }
      else {
        let matchWinner = goalsdb.find({ matchID: fixturesdb.findOne({ matchNum: fixtureData.teamOne })._id })
        if (matchWinner.count() > 0) {
          if (matchWinner.fetch()[0].score > matchWinner.fetch()[1].score)
            teamOne = teamsdb.findOne({ _id: matchWinner.fetch()[0].teamID })
          else
            teamOne = teamsdb.findOne({ _id: matchWinner.fetch()[1].teamID })
        }
        matchWinner = goalsdb.find({ matchID: fixturesdb.findOne({ matchNum: fixtureData.teamTwo })._id })
        if (matchWinner.count() > 0) {
          if (matchWinner.fetch()[0].score > matchWinner.fetch()[1].score)
            teamTwo = teamsdb.findOne({ _id: matchWinner.fetch()[0].teamID })
          else
            teamTwo = teamsdb.findOne({ _id: matchWinner.fetch()[1].teamID })
        }
      }
    }
    console.warn(teamOne, teamTwo, fixtureData)
    let result = goalsdb.find({ 'matchID': mId });
    if (result.count() < 1) {
      // goalsdb.insert({ 'matchID': mId, 'teamID': teamOne._id, 'score': tg1 });
      // goalsdb.insert({ 'matchID': mId, 'teamID': teamTwo._id, 'score': tg2 });
    } else {
      result.forEach(function (goalDocs) {
        if (goalDocs.teamID == teamOne._id) {
          // goalsdb.update({ _id: goalDocs._id }, { $set: { 'score': tg1 } });
        }
        if (goalDocs.teamID == teamTwo._id) {
          // goalsdb.update({ _id: goalDocs._id }, { $set: { 'score': tg2 } });
        }
      });
    }
    $('#teamGoals1').val(0);
    $('#teamGoals2').val(0);
  }
});