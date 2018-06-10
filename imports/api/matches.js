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
	}
});

Template.matchList.events({
	'click .js-matchVote': function(e){
		var matchId = e.currentTarget.id;
		$('#voteModal input[name="matchID"]').val(matchId);
		var teamData = matchesdb.findOne({_id: matchId});
		$('#voteModal input[name="team1"]').val(teamData.teamID1);
		$('#voteModal input[name="team2"]').val(teamData.teamID2);
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