import { Template } from 'meteor/templating'

Template.voteForm.events({
	'click .js-voteTeam': function (event) {
		let tId = event.currentTarget.dataset.id;
		let mId = $('#voteModal input[name="matchID"]').val();
		let uId = Meteor.userId();
		let result = votesdb.find({ $and: [{ matchID: mId }, { userID: uId }] });
		if (!result.count()) {
			votesdb.insert({ "matchID": mId, "userID": uId, "teamID": tId });
		} else {
			let vId = result.fetch()[0]._id;
			votesdb.update({ _id: vId }, { $set: { "teamID": tId } });
		}
		$('#voteModal').modal('hide');
	}
});