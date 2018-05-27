Template.adminConsole.events({
	'click .js-teams'	:function(){
		Router.go('teams.manager');
		// Router.go('teams.manager', {userId:'45'});
		// alert("go teams");
	}
});

Template.teamConsole.onCreated(function(){
	this.teamFlag = new ReactiveVar("flag_white2.png");
});

Template.teamConsole.helpers({
	teamFlag: function(){
		return Template.instance().teamFlag.get();
	}
});

Template.teamConsole.events({
	'change #teamFlagFile': function(event, instance){
		// console.log("Filename: " + event.target.files[0].name);
		// console.log("Size: " + event.target.files[0].size + " bytes");
		// console.log("File type: " + event.target.files[0].type);
		var imageName = event.target.files[0].name;
		Template.instance().teamFlag.set(imageName);
		$("#teamNameField").val(imageName.replace(".png",""));		
	},
	'click .js-teamFlagImage': function(event, instance){		
		$('#teamFlagFile').click();
	},
	'click .js-saveTeam': function(){
		var tFlag = $("#teamNameField").val() + ".png";//$("#teamFlagFile").val();
		var tName = $("#teamNameField").val();
		var tGroup = $("#teamGroupSelect option:selected").text();
		console.log(tName,tFlag,tGroup);
		var result = teamsdb.find({teamName:tName}).count();
		
		if (result < 1){
			// console.log(result+" found! Adding team.");
			teamsdb.insert({"teamFlag":tFlag, "teamName":tName, "teamGroup":tGroup});
		}
		else {
			alert ("Team Already Exist!");
		}
		Template.instance().teamFlag.set("flag_white2.png");
		$("#teamNameField").val("");
		$("#teamGroupSelect").val($("#teamGroupSelect option:first").val());

	},
	'click .js-closeTeam': function(){
		Template.instance().teamFlag.set("flag_white2.png");
		$("#teamNameField").val("");
		$("#teamGroupSelect").val($("#teamGroupSelect option:first").val());
	}
});

Template.teamList.helpers({
	WCTeams: function() {
		return teamsdb.find({}, {sort: {teamName: 1}});
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
	}
});

Template.groupList.helpers({
	GroupA: function(){
		return teamsdb.find({teamGroup:{$eq: "Group A"}}, {sort: {teamName: 1}});
	},
	GroupB: function(){
		return teamsdb.find({teamGroup:{$eq: "Group B"}}, {sort: {teamName: 1}});
	},
	GroupC: function(){
		return teamsdb.find({teamGroup:{$eq: "Group C"}}, {sort: {teamName: 1}});
	},
	GroupD: function(){
		return teamsdb.find({teamGroup:{$eq: "Group D"}}, {sort: {teamName: 1}});
	},
	GroupE: function(){
		return teamsdb.find({teamGroup:{$eq: "Group E"}}, {sort: {teamName: 1}});
	},
	GroupF: function(){
		return teamsdb.find({teamGroup:{$eq: "Group F"}}, {sort: {teamName: 1}});
	},
	GroupG: function(){
		return teamsdb.find({teamGroup:{$eq: "Group G"}}, {sort: {teamName: 1}});
	},
	GroupH: function(){
		return teamsdb.find({teamGroup:{$eq: "Group H"}}, {sort: {teamName: 1}});
	}
});