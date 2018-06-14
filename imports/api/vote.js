Template.voteForm.events({
	'click .js-voteTeam': function(event){
		var teamId = event.currentTarget.dataset.id;
		var matchId = $('#voteModal input[name="matchID"]').val();
		var userId = Meteor.userId();
		console.log("matchID =",matchId);
		console.log("teamID =",teamId);
		console.log("user's id =",userId);
		// if the date has passed then 
		// 	alert user deadline gone and exit
		var matchDate = new Date(matchesdb.findOne({_id: matchId}).matchDateTime);
		var dateNow = new Date();
		if (dateNow > matchDate){
			alert("You can no longer vote for this match.");
			return;			
		} else {		
		// search vote collection for documents with
		// matches that have both userid and matchId
		// if a document is found then 
		// 	update the document
		// else
		// 	insert the document
		
			// votesdb.upsert({$and: [{"matchID": matchId}, {"userID": userId}]}, {$set:{"matchID": matchId, "userID": userId, "teamID": teamId}});			
			// var result = votesdb.findOne({$and: [{"matchID": matchId}, {"userID": userId}]});
			var result = votesdb.find({matchID: "uKj7ueAwpRQbdqCBX"}).matchID;
			console.log(result);
			if (result) {
				console.log("updating vote");				
			} else{
				console.log("no vote found... inserting");
				// votesdb.insert({"matchID": matchId, "userID": userId, "teamID": teamId});
			}
		}
		$('#voteModal').modal('hide');
	}
});