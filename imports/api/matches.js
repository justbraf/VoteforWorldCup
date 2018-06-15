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
		var goals = goalsdb.find({$and: [{teamID:this.teamID1}, {matchID: this._id}]});
		if (goals.count() > 0){
			return goals.fetch()[0].score;
		}
	},
	teamTwoGoals: function(){
		var goals = goalsdb.find({$and: [{teamID:this.teamID2}, {matchID: this._id}]});
		if (goals.count() > 0){
			return goals.fetch()[0].score;
		}
	}
});

var userAdmID = 'dzLsoejG8sQWPrrG6';

Template.matchList.events({
	'click .js-matchVote': function(e){
		var matchId = e.currentTarget.id;
		var teamData = matchesdb.findOne({_id: matchId});
		if (Meteor.userId() == userAdmID){
			var result = goalsdb.find({'matchID': matchId});
			if (result.count() > 0) {				
				result.forEach(function(goalDocs){					
					if (goalDocs.teamID == teamData.teamID1){
						Number($('#teamGoals1').val(goalDocs.score));
					}
					if (goalDocs.teamID == teamData.teamID2){
						Number($('#teamGoals2').val(goalDocs.score));
					}
				});
			}
			$('#setGoalsModal input[name="matchID"]').val(matchId);						
			$('#sgteamFlag1').attr("src", teamsdb.findOne({_id: teamData.teamID1}).teamFlag);
			$('#sgteamFlag1').attr("alt", "Flag of " + teamsdb.findOne({_id: teamData.teamID1}).teamName);
			$('#sgteamFlag2').attr("src",teamsdb.findOne({_id: teamData.teamID2}).teamFlag);
			$('#sgteamFlag2').attr("alt", "Flag of " + teamsdb.findOne({_id: teamData.teamID2}).teamName);
			$('#sgteamName1').html(teamsdb.findOne({_id: teamData.teamID1}).teamName);
			$('#sgteamName2').html(teamsdb.findOne({_id: teamData.teamID2}).teamName);
			$('#setGoalsModal').modal('show');
		} else {
			if (new Date() < new Date(matchesdb.findOne({_id: matchId}).matchDateTime)){
				$('#voteModal input[name="matchID"]').val(matchId);
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
		}
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

Template.setGoals.events({
	'click .js-setGoals': function(){
		var mId = $('#setGoalsModal input[name="matchID"]').val();
		var tg1 = Number($('#teamGoals1').val());
		var tg2 = Number($('#teamGoals2').val());
		var teamData = matchesdb.findOne({_id: mId});		
		var result = goalsdb.find({'matchID': mId});
		if (result.count() < 1) {
			goalsdb.insert({'matchID': mId, 'teamID': teamData.teamID1, 'score': tg1});
			goalsdb.insert({'matchID': mId, 'teamID': teamData.teamID2, 'score': tg2});
		} else {			
			result.forEach(function(goalDocs){				
				if (goalDocs.teamID == teamData.teamID1){
					goalsdb.update({_id: goalDocs._id}, {$set: {'score': tg1}});
				}
				if (goalDocs.teamID == teamData.teamID2){
					goalsdb.update({_id: goalDocs._id}, {$set: {'score': tg2}});
				}
			});
		}
		$('#teamGoals1').val(0);
		$('#teamGoals2').val(0);
	}
});