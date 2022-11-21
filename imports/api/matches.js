Template.matchResults.helpers({
	WCMatches: function(){
		return fixturesdb.find({}, {sort: {matchNum: -1}, skip: (64-(goalsdb.find().count()/2))});
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
		return new Date(fixturesdb.findOne({_id: this._id}).matchDateTime);
	},
	userVoted1: function(){
		// set the color of team columns based on user's vote
		let result = votesdb.find({$and: [{matchID: this._id}, {userID: Meteor.userId()}]});
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
		let result = votesdb.find({$and: [{matchID: this._id}, {userID: Meteor.userId()}]});
		if (result.count() > 0){
			if (result.fetch()[0].teamID == this.teamID2){
				return 1;
			} else{
				return 0;
			}
		}
	},
	showGoals: function(){
		if (new Date() > new Date(fixturesdb.findOne({_id: this._id}).matchDateTime)){
			return true;
		} else{
			return false;
		}
	},
	teamOneGoals: function(){
		let goals = goalsdb.find({$and: [{teamID:this.teamID1}, {matchID: this._id}]});
		if (goals.count() > 0){
			return goals.fetch()[0].score;
		}
	},
	teamTwoGoals: function(){
		let goals = goalsdb.find({$and: [{teamID:this.teamID2}, {matchID: this._id}]});
		if (goals.count() > 0){
			return goals.fetch()[0].score;
		}
	}
});

Template.matchResults.events({
	'click .js-matchVote': function(e){
		let matchId = e.currentTarget.id;
		let teamData = fixturesdb.findOne({_id: matchId});
		if (Meteor.userId() == "userAdmID"){
			let result = goalsdb.find({'matchID': matchId});
			if (result.count() > 0) {				
				result.forEach(function(goalDocs){					
					if (goalDocs.teamID == teamData.teamID1){
						Number($('#teamGoals12').val(goalDocs.score));
					}
					if (goalDocs.teamID == teamData.teamID2){
						Number($('#teamGoals22').val(goalDocs.score));
					}
				});
			}
			$('#setGoalsModal2 input[name="matchID"]').val(matchId);						
			$('#sgteamFlag12').attr("src", teamsdb.findOne({_id: teamData.teamID1}).teamFlag);
			$('#sgteamFlag12').attr("alt", "Flag of " + teamsdb.findOne({_id: teamData.teamID1}).teamName);
			$('#sgteamFlag22').attr("src",teamsdb.findOne({_id: teamData.teamID2}).teamFlag);
			$('#sgteamFlag22').attr("alt", "Flag of " + teamsdb.findOne({_id: teamData.teamID2}).teamName);
			$('#sgteamName12').html(teamsdb.findOne({_id: teamData.teamID1}).teamName);
			$('#sgteamName22').html(teamsdb.findOne({_id: teamData.teamID2}).teamName);
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
// 		console.log(mId);
// 		console.log(mData);
// 		fixturesdb.update({_id: mId}, {$set:{matchDateTime: mData}});
// 	}
// });