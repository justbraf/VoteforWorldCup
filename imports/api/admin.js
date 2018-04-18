Template.adminConsole.events({
	'click .js-teams'	:function(){
		Router.go('teams.manager', {userId:'45'});
		// alert("go teams");
	}
});

Template.teamConsole.onCreated(function(){
	this.teamFlag = new ReactiveVar("flag_white.png");
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
		instance.teamFlag.set(imageName);
		$("#teamNameField").val(imageName.replace(".png",""));
	},
	'click .js-saveTeam': function(){
	}
});