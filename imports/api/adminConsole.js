import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.adminConsole.events({
	'click .js-teams': function () {
		FlowRouter.go('teams.manager');
		// FlowRouter.go('teams.manager', {userId:'45'});
		// alert("go teams");
	},
	'click .js-matches': function () {
		FlowRouter.go('matches.manager');
	},
	'click .js-matchAvail': function () {
		$('#matchAvailField').val(VFWCdb.findOne({}).matchesAvailable);
	},
	'click .js-saveAvail': function () {
		// console.log($('#matchAvailField').val());
		// let settings_id = VFWCdb.findOne();
		// console.log(VFWCdb.find({"_id" : "NHQRvLpuLqvobE8cg"}).count());
		VFWCdb.update({ _id: "NHQRvLpuLqvobE8cg" }, { $set: { matchesAvailable: Number($('#matchAvailField').val()) } });
	}
});

Template.admin2.events({
	'click .js-ma': () => {
		console.log("bam!")
		Meteor.call("user.makeAdmin")
	}
})