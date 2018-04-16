Template.adminConsole.events({
	'click .js-teams'	:function(){
		Router.go('teams.manager', {userId:'45'});
		// alert("go teams");
	}
});