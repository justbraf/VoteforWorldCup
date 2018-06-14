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
		var dateNow = new Date();
		console.log(dateNow);
		
		// search vote collection for documents with
		// matches that have both userid and matchId
		// if a document is found then 
		// 	update the document
		// else
		// 	insert the document

		$('#voteModal').modal('hide');
	}
});