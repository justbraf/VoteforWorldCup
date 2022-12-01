import { Template } from 'meteor/templating';
// import "./predictors.js"

Template.setGoals.events({
  'click .js-setGoals': function () {
    let mId = $('#setGoalsModal input[name="matchID"]').val();
    let tg1 = Number($('#teamGoals1').val());
    let tg2 = Number($('#teamGoals2').val());
    let teamData = fixturesdb.findOne({ _id: mId });
    let result = goalsdb.find({ 'matchID': mId });
    let teamOne = teamsdb.findOne({ $and: [{ grpName: teamData.group }, { groupId: teamData.teamOne }] })
    let teamTwo = teamsdb.findOne({ $and: [{ grpName: teamData.group }, { groupId: teamData.teamTwo }] })
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

Template.setGoals2.events({
  'click .js-setGoals': function () {
    let mId = $('#setGoalsModal2 input[name="matchID"]').val();
    let tg1 = Number($('#teamGoals12').val());
    let tg2 = Number($('#teamGoals22').val());
    let teamData = fixturesdb.findOne({ _id: mId });
    let result = goalsdb.find({ 'matchID': mId });
    result.forEach(function (goalDocs) {
      if (goalDocs.teamID == teamData.teamID1) {
        goalsdb.update({ _id: goalDocs._id }, { $set: { 'score': tg1 } });
      }
      if (goalDocs.teamID == teamData.teamID2) {
        goalsdb.update({ _id: goalDocs._id }, { $set: { 'score': tg2 } });
      }
    });
    $('#teamGoals12').val(0);
    $('#teamGoals22').val(0);
  }
});