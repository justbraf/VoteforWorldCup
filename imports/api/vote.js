Template.voteForm.events({
	'click .js-voteTeam': function(event){
		var tId = event.currentTarget.dataset.id;
		var mId = $('#voteModal input[name="matchID"]').val();
		var uId = Meteor.userId();
		console.log("matchID =",mId);
		console.log("teamID =",tId);
		console.log("user's id =",uId);
		// if the date has passed then 
		// 	alert user deadline gone and exit
		var matchDate = new Date(matchesdb.findOne({_id: mId}).matchDateTime);
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
			var result = votesdb.find({$and: [{matchID: mId}, {userID: uId}]});
			if (result.count()) {
				console.log("updating vote");
				var vId = result.fetch()[0]._id;
				console.log("Result =", vId); //.count());	
				votesdb.update({_id: vId}, {$set: {"teamID": tId}});
			} else{
				console.log("no vote found... inserting");				
				votesdb.insert({"matchID": mId, "userID": uId, "teamID": tId});
			}
		}
		$('#voteModal').modal('hide');
	}
});