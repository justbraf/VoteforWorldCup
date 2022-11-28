import { Template } from 'meteor/templating'

Template.matchResults.helpers({
	WCMatches: function () {
		return fixturesdb.find({ matchDate: { $lt: Date.now() } }, {
			sort: { matchDate: -1 }
			// , skip: (64-(goalsdb.find().count()/2))
		});
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
		let goals = goalsdb.find({ $and: [{ teamID: teamOne._id }, { matchID: this._id }] });
		if (goals.count() > 0) {
			return goals.fetch()[0].score;
		}
		return "?"
	},
	teamTwoGoals: function () {
		let teamTwo = teamsdb.findOne({ $and: [{ grpName: this.group }, { groupId: this.teamTwo }] })
		let goals = goalsdb.find({ $and: [{ teamID: teamTwo._id }, { matchID: this._id }] });
		if (goals.count() > 0) {
			return goals.fetch()[0].score;
		}
		return "?"
	}
});

Template.matchResults.events({
	'click .js-matchVote': function (e) {
		let matchId = e.currentTarget.id;
		let teamData = fixturesdb.findOne({ _id: matchId });
		if (Meteor.userId() == "userAdmID") {
			let result = goalsdb.find({ 'matchID': matchId });
			if (result.count() > 0) {
				result.forEach(function (goalDocs) {
					if (goalDocs.teamID == teamData.teamID1) {
						Number($('#teamGoals12').val(goalDocs.score));
					}
					if (goalDocs.teamID == teamData.teamID2) {
						Number($('#teamGoals22').val(goalDocs.score));
					}
				});
			}
			$('#setGoalsModal2 input[name="matchID"]').val(matchId);
			$('#sgteamFlag12').attr("src", teamsdb.findOne({ _id: teamData.teamID1 }).teamFlag);
			$('#sgteamFlag12').attr("alt", "Flag of " + teamsdb.findOne({ _id: teamData.teamID1 }).teamName);
			$('#sgteamFlag22').attr("src", teamsdb.findOne({ _id: teamData.teamID2 }).teamFlag);
			$('#sgteamFlag22').attr("alt", "Flag of " + teamsdb.findOne({ _id: teamData.teamID2 }).teamName);
			$('#sgteamName12').html(teamsdb.findOne({ _id: teamData.teamID1 }).teamName);
			$('#sgteamName22').html(teamsdb.findOne({ _id: teamData.teamID2 }).teamName);
			$('#setGoalsModal2').modal('show');
		}
	}
});

// Template.editMatch.helpers({
// 	allMatches: function(){
// 		return fixturesdb.find();
// 	}
// });

// Template.editMatch.events({
// 	'dblclick .js-editMatch': function(event){
// 		let mId = $(event.currentTarget).data('id');
// 		let mData = $(event.currentTarget).val();
// 		fixturesdb.update({_id: mId}, {$set:{matchDateTime: mData}});
// 	}
// });