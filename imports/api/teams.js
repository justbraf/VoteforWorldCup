// Template.teamList.onCreated(function(){
// 	this.WCTeamID = new ReactiveVar(0);	
// });

Template.teamList.helpers({
	WCTeams: function() {
		return teamsdb.find({teamFlag: {$ne: "flag_white.png"}}, {sort: {teamName: 1}});
	}
});

Template.teamList.events({
	'click .js-delTeam': function(){		
		$('#delModal input[name="del_idTeam"]').val(this._id);
		$('#delModal #delModalLabel').text(this.teamName);
		$('#delModal').modal('show');		
	},
	'click .js-delTeamConfirm': function(){
		// console.log($('#delModal input[name="del_idTeam"]').val());
		teamsdb.remove({_id:$('#delModal input[name="del_idTeam"]').val()});
	},
	'click .WCTeam': function(event, instance) {
    // Template.instance().WCTeamID.set(event.currentTarget.id);    
    Session.set("WCTeamID", event.currentTarget.id);
  }
});

Template.teamStats.helpers({
	Stats: function(){		
		return matchesdb.find({ $or: [{teamID1: Session.get("WCTeamID")}, {teamID2: Session.get("WCTeamID")}] });
		// var xDates = [];
		// matchesdb.find({ $or: [{teamID1: Session.get("WCTeamID")}, {teamID2: Session.get("WCTeamID")}] }).forEach( function(allTheDates){		   
		// 	allTheDates.matchDateTime = Date(allTheDates.matchDateTime);
		// 	xDates.push(allTheDates);
		// });
		// return xDates;
	},
	tDay: function(){
		var theDate = new Date;
		return theDate; //.format("MM/DD/YYYY");
	}
});