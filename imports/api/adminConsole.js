import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
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
	// 'click .js-saveAvail': function () {
		// let settings_id = VFWCdb.findOne();
		// VFWCdb.update({ _id: "NHQRvLpuLqvobE8cg" }, { $set: { matchesAvailable: Number($('#matchAvailField').val()) } });
	// },
	'dblclick .js-wipeRanks': () => {
		Meteor.call("wipeRanks")
	},
	'dblclick .js-wipePoints': () => {
		Meteor.call("wipePoints")
	}
});

Template.adminConsole.helpers({
	totalUsers: () => {
		Meteor.call("usersRegistered", (error, result) => {
			Session.set("numUsers", result)
		})
		return Session.get("numUsers")
	}
})

Template.admin2.events({
	'click .js-ma': () => {
		Meteor.call("user.makeAdmin")
	}
})