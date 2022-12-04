import { Template } from 'meteor/templating';
// import "./predictors.js"

Template.setGoals.events({
  'click .js-setGoals': function () {
    let mId = $('#setGoalsModal input[name="matchID"]').val();
    let tg1 = Number($('#teamGoals1').val());
    let tg2 = Number($('#teamGoals2').val());
    let teamGroups = "ABCDEFGH"
    let fixtureData = fixturesdb.findOne({ _id: mId });
    let teamOne
    let teamTwo
    if (teamGroups.includes(fixtureData.group)) {
      teamOne = teamsdb.findOne({ $and: [{ grpName: fixtureData.group }, { groupId: fixtureData.teamOne }] })
      teamTwo = teamsdb.findOne({ $and: [{ grpName: fixtureData.group }, { groupId: fixtureData.teamTwo }] })
    }
    else {
      if (teamGroups.includes(fixtureData.teamOne[1])) {
        teamOne = teamsdb.findOne({ grpName: fixtureData.teamOne[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (fixtureData.teamOne[0] - 1) })
        teamTwo = teamsdb.findOne({ grpName: fixtureData.teamTwo[1] }, { sort: { points: -1, goalDiff: -1, goalsFor: -1 }, limit: 1, skip: (fixtureData.teamTwo[0] - 1) })
      }
    }
    let result = goalsdb.find({ 'matchID': mId });
    if (result.count() < 1) {
      goalsdb.insert({ 'matchID': mId, 'teamID': teamOne._id, 'score': tg1 });
      goalsdb.insert({ 'matchID': mId, 'teamID': teamTwo._id, 'score': tg2 });
    } else {
      result.forEach(function (goalDocs) {
        if (goalDocs.teamID == teamOne._id) {
          goalsdb.update({ _id: goalDocs._id }, { $set: { 'score': tg1 } });
        }
        if (goalDocs.teamID == teamTwo._id) {
          goalsdb.update({ _id: goalDocs._id }, { $set: { 'score': tg2 } });
        }
      });
    }
    $('#teamGoals1').val(0);
    $('#teamGoals2').val(0);
  }
});