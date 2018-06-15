Template.matchList.helpers({
	WCMatches: function(){
		return matchesdb.find({}, {sort: {matchNum: 1}});
		// return matchesdb.find({}, {orderby:{matchNum:1}});
	},
	teamOne: function(){		
		return teamsdb.findOne({_id: this.teamID1}).teamFlag;
	},
	teamTwo: function(){
		return teamsdb.findOne({_id: this.teamID2}).teamFlag;
	},
	teamOneName: function(){		
		return teamsdb.findOne({_id: this.teamID1}).teamName;
	},
	teamTwoName: function(){
		return teamsdb.findOne({_id: this.teamID2}).teamName;
	},	
	matchDateTimeFull: function(){
		return new Date(matchesdb.findOne({_id: this._id}).matchDateTime);
	},
	userVoted1: function(){
		// set the color of team columns based on user's vote
		var result = votesdb.find({$and: [{matchID: this._id}, {userID: Meteor.userId()}]});
		if (result.count() > 0){
			if (result.fetch()[0].teamID == this.teamID1){
				return 1;
			} else{
				return 0;
			}
		}
	},
	userVoted2: function(){
		// set the color of team columns based on user's vote
		var result = votesdb.find({$and: [{matchID: this._id}, {userID: Meteor.userId()}]});
		if (result.count() > 0){
			if (result.fetch()[0].teamID == this.teamID2){
				return 1;
			} else{
				return 0;
			}
		}
	},
	showGoals: function(){
		if (new Date() > new Date(matchesdb.findOne({_id: this._id}).matchDateTime)){
			return true;
		} else{
			return false;
		}
	},
	teamOneGoals: function(){
		return 5;
	},
	teamTwoGoals: function(){
		return 0;
	}
});

Template.matchList.events({
	'click .js-matchVote': function(e){
		var matchId = e.currentTarget.id;
		$('#voteModal input[name="matchID"]').val(matchId);
		var teamData = matchesdb.findOne({_id: matchId});
		// $('#voteModal input[name="team1"]').val(teamData.teamID1);
		// $('#voteModal input[name="team2"]').val(teamData.teamID2);
		$('#voteModal #teamName1Vote').attr("data-id", teamData.teamID1);
		$('#voteModal #teamName2Vote').attr("data-id", teamData.teamID2);		
		$('#voteModal input[name="matchnum"]').val(teamData.matchNum);
		$('#teamFlag1').attr("src", teamsdb.findOne({_id: teamData.teamID1}).teamFlag);
		$('#teamFlag1').attr("alt", "Flag of " + teamsdb.findOne({_id: teamData.teamID1}).teamName);
		$('#teamFlag2').attr("src",teamsdb.findOne({_id: teamData.teamID2}).teamFlag);
		$('#teamFlag2').attr("alt", "Flag of " + teamsdb.findOne({_id: teamData.teamID2}).teamName);
		$('#teamName1').html(teamsdb.findOne({_id: teamData.teamID1}).teamName);
		$('#teamName2').html(teamsdb.findOne({_id: teamData.teamID2}).teamName);
		$('#voteModal').modal('show');
	}
});

// Template.editMatch.helpers({
// 	allMatches: function(){
// 		return matchesdb.find();
// 	}
// });

// Template.editMatch.events({
// 	'dblclick .js-editMatch': function(event){
// 		var mId = $(event.currentTarget).data('id');
// 		var mData = $(event.currentTarget).val();
// 		console.log(mId);
// 		console.log(mData);
// 		matchesdb.update({_id: mId}, {$set:{matchDateTime: mData}});
// 	}
// });