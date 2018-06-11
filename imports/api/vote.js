Template.voteForm.events({
	'click .js-voteTeam': function(event){
		var teamId = event.currentTarget.dataset.id;
		console.log(event.currentTarget.dataset.id);
		$('#voteModal').modal('hide');
	}
});