Template.teamList.helpers({
	WCTeams: function() {
		return teamsdb.find({}, {sort: {team: 1}});
	}
});

Template.teamList.events({
	// 'click .js-delTeam': function(){		
	// 	$('#delModal input[name="del_idTeam"]').val(this._id);
	// 	$('#delModal #delModalLabel').text(this.teamName);
	// 	$('#delModal').modal('show');		
	// },
	// 'click .js-delTeamConfirm': function(){
	// 	// console.log($('#delModal input[name="del_idTeam"]').val());
	// 	teamsdb.remove({_id:$('#delModal input[name="del_idTeam"]').val()});
	// },
	// 'click .WCTeam': function(event, instance) {
  //   // Template.instance().WCTeamID.set(event.currentTarget.id);    
  //   Session.set("WCTeamID", event.currentTarget.id);
  // }
});