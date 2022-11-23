Template.voteForm.events({
	'click .js-voteTeam': function (event) {
		let tId = event.currentTarget.dataset.id;
		let mId = $('#voteModal input[name="matchID"]').val();
		let uId = Meteor.userId();
		let result = votesdb.find({ $and: [{ matchID: mId }, { userID: uId }] });
		if (result.count()) {
			let vId = result.fetch()[0]._id;	
			votesdb.update({ _id: vId }, { $set: { "teamID": tId } });
		} else {
			votesdb.insert({ "matchID": mId, "userID": uId, "teamID": tId });
		}
		$('#voteModal').modal('hide');
	}
});